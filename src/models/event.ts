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
}

const eventSchema = new mongoose.Schema({
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
  name: { type: String, required: true },
  organizer: { type: Schema.Types.ObjectId, ref: "User", required: true },
  capacity: { type: Number, required: true },
  attendees: [{ type: Schema.Types.ObjectId, ref: "User" }],
  timestamps: boolean,
});

export default mongoose.model<IEvent>("Event", eventSchema);
