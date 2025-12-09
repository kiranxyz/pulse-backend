import { Request, Response } from "express";
import User from "#models/user.ts";
import Event from "#models/event.ts";
import { Ticket } from "#models/Ticket.ts";

export const stats = async (req: Request, res: Response) => {
  const totalUsers = await User.countDocuments();
  const totalEvents = await Event.countDocuments();
  const totalTickets = await Ticket.countDocuments();
  const totalCheckins = await Ticket.countDocuments({ scanned: true });

  const finance = {
    revenueTotal: 100000,
    revenueThisMonth: 8000,
    highestEarningEvent: { name: "Tech Fusion Summit", revenue: 9600 },
  };

  res.json({
    overview: {
      totalUsers,
      newUsersThisMonth: 10,
      activeUsersThisMonth: 50,
    },
    events: {
      totalEvents,
      upcomingEventsThisMonth: 4,
      pastEventsThisMonth: 2,
    },
    tickets: {
      ticketsSoldThisMonth: 230,
      ticketsAvailableThisMonth: totalEvents * 100,
      checkinsThisMonth: 190,
      attendanceRateThisMonth: 75,
    },
    finance,
  });
};

export const listUsers = async (req: Request, res: Response) => {
  const users = await User.find().lean();
  res.json(users);
};

export const toggleUserActive = async (req: Request, res: Response) => {
  const id = req.params.id;
  const u = await User.findById(id);
  if (!u) return res.status(404).json({ error: "Not found" });
  (u as any).active = !(u as any).active;
  await u.save();
  res.json(u);
};
