import { Request, Response } from "express";
import User from "../models/user.ts";
import Event from "../models/event.ts";
import Ticket from "../models/Ticket.ts";

export const getAdminStats = async (req: Request, res: Response) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalEvents = await Event.countDocuments();
    const totalTickets = await Ticket.countDocuments();
    const totalCheckins = await Ticket.countDocuments({ checkedIn: true });

    return res.json({
      totalUsers,
      totalEvents,
      totalTickets,
      totalCheckins,
    });
  } catch (err) {
    console.error("ADMIN STATS ERROR:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
