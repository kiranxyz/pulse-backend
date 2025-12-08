import { Ticket } from "../models/Ticket.ts";
import User from "../models/User.ts";

export const getTicketDataById = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) return res.status(404).json({ message: "Ticket not found" });
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getTicketDataByUserId = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
