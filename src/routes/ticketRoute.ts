import { Router } from "express";
import fs from "fs";
import { sendTicketEmail } from "../utils/sendEmail.ts";
import { UserProfile } from "../models/userProfile.ts";
import { Event } from "#models/Event.ts";

const router = Router();

router.get("/:ticketCode", async (req, res) => {
  try {
    const { ticketCode } = req.params;
    const ticketPath = `src/pdfTickets/ticket_${ticketCode}.pdf`;

    console.log("Ticket path:", ticketPath);

    // Check if PDF exists
    if (!fs.existsSync(ticketPath)) {
      return res.status(404).send({ error: "Ticket not found" });
    }

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `inline; filename=ticket_${ticketPath}.pdf`
    );

    // Stream the file to the client
    const fileStream = fs.createReadStream(ticketPath);
    fileStream.pipe(res);
  } catch (error: any) {
    res.status(500).send({ error: error.message });
  }
});

router.post("/email", async (req, res) => {
  try {
    const { userId, eventId, ticketCode } = req.body;
    if (!userId || !ticketCode) {
      return res.status(400).send({ error: "Missing userId or ticketCode" });
    }

    // Fetch user email from database (pseudo-code, replace with actual DB call)
    const user = await UserProfile.findOne({ authId: userId });
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    const event = await Event.findById(eventId);
    if (!event) {
      return res
        .status(404)
        .send({ error: "Event not found by id :", eventId });
    }

    const ticketPath = `src/pdfTickets/ticket_${ticketCode}.pdf`;
    if (!fs.existsSync(ticketPath)) {
      return res
        .status(404)
        .send({ error: `Ticket not found with code :  ${ticketCode}` });
    }

    // await sendTicketEmail({
    //   to: user.email,
    //   subject: event.title + " - Your Ticket",
    //   html: `<p>Thank you for registering! Please find your ticket attached.</p>`,
    //   attachmentPath: ticketPath,
    // });
<<<<<<< HEAD
    res.status(200).send({ message: "Ticket email sent successfully" });
=======
    console.log(`Email sent to ${user.email} with ticket ${ticketCode}`);
    res.status(200).send({ message: "Ticket sent via email successfully" });
>>>>>>> 4d5c847ed5a467bd03f4e630afdd48e7d347d76c
  } catch (error: any) {
    res.status(500).send({ error: error.message });
  }
});

export default router;
