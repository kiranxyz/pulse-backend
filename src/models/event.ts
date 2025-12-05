import mongoose, { Schema, Document } from "mongoose";
import { boolean } from "zod";

export interface IEvent extends Document {
  title: string;
  address: string;
  date: Date;
  time: string;
  totalSeats: number;
  seatsBooked: number;
  discount?: {
    firstN: number;
    percent: number;
  };
  description?: string;
  name: string;
  organizer: mongoose.Types.ObjectId;
  capacity: number;
  attendees: mongoose.Types.ObjectId[];
  location: string;
  ticketsSold: number;
  ticketAvailable: Number;
  seatLeft: Number;
  image?: string;
  price?: number;
  latitude?: string;
  longitude?: string;
  organizerId?: string;
}

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    address: String,
    date: Date,
    time: String,
    totalSeats: { type: Number, required: true },
    seatsBooked: { type: Number, default: 0 },
    discount: {
      firstN: { type: Number, default: 0 },
      percent: { type: Number, default: 0 },
    },
    description: String,
    image: String,
    price: Number,
    latitude: String,
    longitude: String,
    categories: [
      {
        type: String,
        required: true,
        trim: true,
      },
    ],
    organizerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AuthUser",
      required: true,
    },
  },
  { timestamps: true }
);

export const Event = mongoose.model("Event", eventSchema);
// (mongoose.models.Event as mongoose.Model<IEvent>) ||
// mongoose.model<IEvent>("Event", eventSchema);
