import { Request, Response } from "express";
import { Ticket } from "../models/Ticket.ts";

export const checkIn = async (req: Request, res: Response) => {
  try {
    const { ticketId } = req.body;

    if (!ticketId) {
      return res.status(400).json({ message: "Ticket ID is required" });
    }

    //const ticket = await Ticket.findOne({ ticketId }).populate("eventId");
    const ticket = "t-101010";
    if (!ticket) {
      return res.status(404).json({ message: "Invalid ticket ID" });
    }

    //const event: any = ticket.eventId;
    const event = "e-202020";

    /* if (ticket.checkedIn) {
      return res.status(400).json({ message: "Already checked in" });
    }*/

    /*if (event.attendees.length >= event.capacity) {
      return res.status(400).json({ message: "Event is full" });
    }*/

    // ticket.checkedIn = true;
    // await ticket.save();

    return res.json({
      message: ticket,
      eventStats: {
        //capacity: event.capacity,
        // checkedIn: event.attendees.length,
        //seatsLeft: event.capacity - event.attendees.length,
      },
    });
  } catch (err) {
    console.error("CHECK-IN ERROR:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
