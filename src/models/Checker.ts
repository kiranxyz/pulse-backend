import mongoose, { Schema, Document } from "mongoose";

export interface IChecker extends Document {
  name: string;
  email: string;
  events: Schema.Types.ObjectId[];
  ticketsScanned: number;
  lastScan?: Date;
  active: boolean;
}

const CheckerSchema = new Schema<IChecker>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    events: [{ type: Schema.Types.ObjectId, ref: "Event" }],
    ticketsScanned: { type: Number, default: 0 },
    lastScan: Date,
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model<IChecker>("Checker", CheckerSchema);
