import mongoose from "mongoose";
import { RequestHandler } from "express";
import { Ticket } from "#models/Ticket.ts";
import Checker from "#models/Checker.ts";

export const analytics: RequestHandler = async (req, res) => {
  try {
    const checkerId = req.params.id; // <-- from authentication middleware

    if (!checkerId) {
      return res.status(401).json({ message: "Unauthorized: no checker id" });
    }

    const total = await Ticket.countDocuments({
      checkedIn: true,
      checkedInBy: checkerId,
    });

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const today = await Ticket.countDocuments({
      checkedIn: true,
      checkedInBy: checkerId,
      checkedInAt: { $gte: startOfDay },
    });

    const scansPerEvent = await Ticket.aggregate([
      {
        $match: {
          checkedIn: true,
          checkedInBy: checkerId,
        },
      },
      {
        $group: {
          _id: "$event",
          scanned: { $sum: 1 },
        },
      },
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
          scanned: 1,
        },
      },
    ]);

    const recentTickets = await Ticket.find({
      checkedIn: true,
      checkedInBy: checkerId,
    })
      .sort({ checkedInAt: -1 })
      .limit(20)
      .populate("event", "title");

    const recent = recentTickets.map((t) => ({
      ticketId: t.ticketCode,
      time: t.scannedAt,
      event: t.event || "Unknown Event",
    }));

    res.json({
      checkerId,
      today,
      total,
      events: scansPerEvent,
      recent,
    });
  } catch (err) {
    console.error("Analytics Error:", err);
    res.status(500).json({ message: "Server error fetching analytics" });
  }
};

export const doCheckIn: RequestHandler = async (req, res) => {
  try {
    const checkerId = req.params.id;

    const { ticketId } = req.body;

    if (!ticketId) return res.status(400).json({ error: "ticketId required" });

    if (!checkerId) return res.status(401).json({ error: "Not authenticated" });

    const ticket = await Ticket.findOne({ ticketCode: ticketId });

    if (!ticket) return res.status(404).json({ error: "Ticket not found" });

    if (ticket.scanned)
      return res.status(400).json({ error: "Already checked in" });

    ticket.scanned = true;
    ticket.scannedAt = new Date();
    ticket.scannedBy = new mongoose.Types.ObjectId(checkerId);
    await ticket.save();

    await Checker.findOneAndUpdate(
      { user: checkerId },
      {
        $inc: { ticketsScanned: 1 },
        lastScan: new Date(),
      }
    );

    res.json({
      message: "Checked in",
      ticketCode: ticket.ticketCode,
      scannedBy: checkerId,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Check-in failed" });
  }
};
