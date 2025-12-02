import { Request, Response } from "express";
import Event from "../../src/models/event.ts";
import Ticket from "../models/Ticket.js";

export const checkIn = async (req: Request, res: Response) => {
  try {
    const { ticketId } = req.body;
    const userId = req.params?.id;

    if (!ticketId) {
      return res.status(400).json({ message: "Ticket ID is required" });
    }

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const ticket = await Ticket.findOne({ ticketId }).populate("event");

    if (!ticket) {
      return res.status(404).json({ message: "Invalid ticket ID" });
    }

    const event: any = ticket.event;

    if (ticket.user.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "This ticket does not belong to you" });
    }

    if (ticket.checkedIn) {
      return res.status(400).json({ message: "Already checked in" });
    }

    if (event.attendees.length >= event.capacity) {
      return res.status(400).json({ message: "Event is full" });
    }

    ticket.checkedIn = true;
    await ticket.save();

    if (!event.attendees.includes(userId)) {
      event.attendees.push(userId);
      await event.save();
    }

    return res.json({
      message: "Check-in successful",
      eventStats: {
        capacity: event.capacity,
        checkedIn: event.attendees.length,
        seatsLeft: event.capacity - event.attendees.length,
      },
    });
  } catch (err) {
    console.error("CHECK-IN ERROR:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
