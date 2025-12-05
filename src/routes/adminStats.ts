import { Router, Request, Response } from "express";
import User from "../models/user.ts";
import Event from "../models/event.ts";
import Ticket from "../models/Ticket.ts";
import Attendance from "../models/attendance.ts";

const router = Router();

router.get("/stats", async (req: Request, res: Response) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalEvents = await Event.countDocuments();
    const totalTickets = await Ticket.countDocuments();
    const totalCheckins = await Attendance.countDocuments();

    const revenueResult = await Ticket.aggregate([
      { $match: { purchased: true } },
      { $group: { _id: null, total: { $sum: "$price" } } },
    ]);
    const revenue = revenueResult[0]?.total || 0;

    const event = await Event.findOne().sort({ createdAt: -1 });

    let capacity = 0;
    let ticketSold = 0;
    let attendance = 0;

    if (event) {
      capacity = event.capacity;
      ticketSold = await Ticket.countDocuments({
        eventId: event._id,
        purchased: true,
      });
    }

    const ticketAvailable = capacity - ticketSold;
    const seatLeft = capacity - attendance;

    return res.json({
      totalUsers,
      totalEvents,
      totalTickets,
      totalCheckins,
      revenue,
      capacity,
      ticketSold,
      ticketAvailable,
      seatLeft,
      attendance,
    });
  } catch (error) {
    console.error("Admin stats error:", error);
    return res.status(500).json({ message: "Failed to load stats" });
  }
});

export default router;
