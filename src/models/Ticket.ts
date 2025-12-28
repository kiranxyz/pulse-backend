import mongoose from "mongoose";
import { boolean } from "zod";
const ticketSchema = new mongoose.Schema({
  registration: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "EventRegistration",
    required: true,
    unique: true, // 1 ticket per registration
  },
  ticketId: {
    type: String,
    required: true,
    unique: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    required: true,
  },
  ticketCode: {
    type: String,
    required: true,
    unique: true,
  },
  issuedAt: {
    type: Date,
    default: Date.now,
  },
  scanned: {
    type: boolean,
    default: false,
  },
  scannedAt: {
    type: Date,
    default: Date.now,
  },
  scannedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
});

export const Ticket = mongoose.model("Ticket", ticketSchema);
