<<<<<<< HEAD
import mongoose, { Schema, Document, Model } from "mongoose";

export interface ITicket extends Document {
  eventId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  ticketId: string;
  checkedIn: boolean;
  price: number;
  purchased: boolean;
}

const ticketSchema = new Schema<ITicket>(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },

    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    ticketId: {
      type: String,
      unique: true,
      required: true,
    },

    checkedIn: {
      type: Boolean,
      default: false,
    },

    price: {
      type: Number,
      default: 0,
    },

    purchased: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Ticket: Model<ITicket> = mongoose.model<ITicket>("Ticket", ticketSchema);

export default Ticket;
=======
import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
  registration: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "EventRegistration",
    required: true,
    unique: true, // 1 ticket per registration
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
});

export const Ticket = mongoose.model("Ticket", ticketSchema);
>>>>>>> origin/dev
