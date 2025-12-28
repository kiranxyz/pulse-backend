import { EventRegistration } from "#models/EventRegistration.ts";
import { Ticket } from "#models/Ticket.ts";
//import { AuthUser } from "#models/AuthUser.ts";
import Event from "#models/event.ts";
import { generateTicketPDF } from "../utils/GeneratePdfTicket.ts";
import crypto from "crypto";
import { RequestHandler } from "express";
import UserProfile from "../models/userProfile.ts";

const registerParticipant: RequestHandler = async (req, res) => {
  try {
    const { eventId, userId } = req.body;
    if (!eventId || !userId) {
      res
        .status(400)
        .json({ msg: "Please provide eventId and userId both are mendatory" });
    }
    const found = await EventRegistration.findOne({ eventId, userId });
    if (found)
      return res
        .status(400)
        .json({ error: "User already registered for this event." });

    const registration = await EventRegistration.create({
      event: eventId,
      user: userId,
    });
    // generate unique ticket code
    //const ticketCode = crypto.randomUUID();
    const ticketCode = Math.floor(10000 + Math.random() * 90000).toString();
    const user = await UserProfile.findOne({ authId: userId });
    const event = await Event.findById(eventId);

    // create ticket
    const ticket = await Ticket.create({
      registration: registration._id,
      user: userId,
      event: eventId,
      ticketCode,
      ticketId: ticketCode,
    });

    if (user !== null && event !== null) {
      try {
        generateTicketPDF({
          ticketCode: ticket.ticketCode,
          eventTitle: event.title,
          userName: user.username,
          savePath: `src/pdfTickets/ticket_${ticket.ticketCode}.pdf`,
        });

        res.json({
          msg: "Participant registered successfully",
          ticket,
        });
      } catch (error) {}
    } else {
      console.error(
        "User or Event not found for ticket generation. So registration not completed."
      );
      res.json({
        msg: "User or Event not found for ticket generation. So registration not completed.",
      });
    }
  } catch (error) {
    throw new Error("Failed to register participant: " + error);
  }
};

export { registerParticipant };
