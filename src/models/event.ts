import mongoose, { Schema, Document } from "mongoose";

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
});

export const Event =
  (mongoose.models.Event as mongoose.Model<IEvent>) ||
  mongoose.model<IEvent>("Event", eventSchema);
