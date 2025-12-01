import { Router } from "express";

import dotenv from "dotenv";
import { get } from "http";
dotenv.config();
const router = Router();

router.post("/:ticketId", async (req, res) => {
  try {
    const { ticketId } = req.body;

    const ticketData = getTicketData(ticketId); // Assume this function fetches ticket data
  } catch (error: any) {
    res.status(500).send({ error: error.message });
  }
});

export default router;
