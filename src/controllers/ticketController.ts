// src/controllers/ticketController.ts
import { RequestHandler } from "express";
import { EventRegistration } from "#models/EventRegistration.ts";
import { Ticket } from "#models/Ticket.ts";
import Event from "#models/event.ts";
import UserProfile from "#models/userProfile.ts";
import { generateTicketPDF } from "../utils/GeneratePdfTicket.ts";

export const registerParticipant: RequestHandler = async (req, res) => {
  try {
    const { eventId, userId } = req.body;
    if (!eventId || !userId)
      return res.status(400).json({ error: "eventId and userId required" });

    const exists = await EventRegistration.findOne({
      event: eventId,
      user: userId,
    });
    if (exists) return res.status(400).json({ error: "Already registered" });

    const registration = await EventRegistration.create({
      event: eventId,
      user: userId,
    });

    const ticketCode = Math.random().toString(36).slice(2, 9).toUpperCase();
    console.log("Generated ticket code:", ticketCode);
    const ticket = await Ticket.create({
      registration: registration._id,
      user: userId,
      event: eventId,
      ticketCode,
    });

    // increment counts
    await Event.findByIdAndUpdate(eventId, {
      $inc: { ticketsSold: 1, revenue: 0 },
    });

    // generate pdf
    const user = await UserProfile.findOne({ authId: userId });
    const event = await Event.findById(eventId);
    try {
      await generateTicketPDF({
        ticketCode: ticket.ticketCode,
        eventTitle: event?.title ?? "Event",
        userName: user?.username ?? "User",
        savePath: `src/uploads/ticket_${ticket.ticketCode}.pdf`,
      });
    } catch (err) {
      console.warn("pdf generation failed", err);
    }

    res.json({ ticket, registration });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Registration failed" });
  }
};
