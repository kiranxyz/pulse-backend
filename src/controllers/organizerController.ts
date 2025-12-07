import { Request, Response } from "express";
import Event from "#models/event.ts";
import Checker from "#models/Checker.ts";
import UserProfile from "#models/userProfile.ts";
import { Ticket } from "#models/Ticket.ts";

export const organizerEvents = async (req: Request, res: Response) => {
  const events = await Event.find().lean();
  res.json(events);
};

export const organizerCheckers = async (req: Request, res: Response) => {
  const checkers = await Checker.find().populate("events").lean();
  res.json(checkers);
};
export const listUsers = async (_req: any, res: any) => {
  try {
    const users = await UserProfile.find({
      role: { $in: [/^participant$/i, /^ticketchecker$/i] }, // only participants & ticket checkers
    }).select("_id username email role active events");

    res.json(users);
  } catch (err) {
    console.error("listUsers error:", err);
    res.status(500).json({ error: "Failed to load users" });
  }
};

export const toggleUserActive = async (req: Request, res: Response) => {
  const id = req.params.id;
  const u = await UserProfile.findById(id);
  if (!u) return res.status(404).json({ error: "Not found" });
  (u as any).active = !(u as any).active;
  await u.save();
  res.json(u);
};
export const addChecker = async (req: Request, res: Response) => {
  const { name, email, events } = req.body;
  const checker = new Checker({ name, email, events: events || [] });
  await checker.save();
  res.json(checker);
};

export const analytics = async (req: Request, res: Response) => {
  try {
    const organizerId = req.params._id;

    const totalEvents = await Event.countDocuments({ organizer: organizerId });

    const upcomingEvents = await Event.countDocuments({
      organizer: organizerId,
      date: { $gte: new Date() },
    });

    const events = await Event.find({ organizer: organizerId }).select("_id");
    const eventIds = events.map((e) => e._id);

    const ticketsSold = await Ticket.countDocuments({
      event: { $in: eventIds },
    });

    const totalCheckers = await UserProfile.countDocuments({
      role: "ticketchecker",
      events: { $in: eventIds },
    });

    const ticketsPerEvent = await Ticket.aggregate([
      { $match: { event: { $in: eventIds }, checkedIn: true } },
      { $group: { _id: "$event", ticketsSold: { $sum: 1 } } },
      {
        $lookup: {
          from: "events",
          localField: "_id",
          foreignField: "_id",
          as: "event",
        },
      },
      { $unwind: "$event" },
      {
        $project: {
          eventId: "$event._id",
          title: "$event.title",
          ticketsSold: 1,
        },
      },
    ]);

    res.json({
      totalEvents,
      upcomingEvents,
      ticketsSold,
      totalCheckers,
      ticketsPerEvent,
    });
  } catch (err) {
    console.error("Organizer Analytics Error:", err);
    res.status(500).json({ message: "Server error fetching analytics" });
  }
};
