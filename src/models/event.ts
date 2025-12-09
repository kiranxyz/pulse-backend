import mongoose, { Schema, model, Document } from "mongoose";

export interface IEvent extends Document {
  title: string;
  address?: string;
  date: Date;
  time?: string;
  totalSeats: number;
  seatsBooked: number;
  discount?: {
    firstN: number;
    percent: number;
  };
  description?: string;
  image?: string;
  price?: number;
  organizer?: mongoose.Types.ObjectId;
  categories?: string[];
  ticketsSold: number;
  checkIns: number;
  revenue: number;
  latitude?: string;
  longitude?: string;
  options?: {
    discountFirst10: boolean;
    showHurryUp: boolean;
    reminder: boolean;
    emailNotify: boolean;
  };
}

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    address: String,
    date: { type: Date, required: true },
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

    organizer: { type: Schema.Types.ObjectId, ref: "User" },

    categories: [{ type: String, trim: true }],

    ticketsSold: { type: Number, default: 0 },
    checkIns: { type: Number, default: 0 },
    revenue: { type: Number, default: 0 },

    options: {
      discountFirst10: { type: Boolean, default: false },
      showHurryUp: { type: Boolean, default: false },
      reminder: { type: Boolean, default: false },
      emailNotify: { type: Boolean, default: false },
    },
  },
  { timestamps: true }
);

export default model<IEvent>("Event", eventSchema);
