import { Schema, model } from "mongoose";

const attendanceSchema = new Schema(
  {
    eventId: { type: Schema.Types.ObjectId, ref: "Event" },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    checkedInAt: Date,
  },
  { timestamps: true }
);

export default model("Attendance", attendanceSchema);
