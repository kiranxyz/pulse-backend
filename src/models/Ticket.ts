import mongoose, { Schema, Document, Model } from "mongoose";

export interface ITicket extends Document {
  event: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  ticketId: string;
  checkedIn: boolean;
}

const ticketSchema = new Schema<ITicket>(
  {
    event: { type: Schema.Types.ObjectId, ref: "Event", required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    ticketId: { type: String, unique: true, required: true },
    checkedIn: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Ticket: Model<ITicket> = mongoose.model<ITicket>("Ticket", ticketSchema);
export default Ticket;
