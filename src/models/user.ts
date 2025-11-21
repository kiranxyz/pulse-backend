import { Schema, model, Document } from "mongoose";

export interface UserDoc extends Document {
  name: string;
  email: string;
  password: string;
  role: "attendee" | "organizer" | "admin";
}

const UserSchema = new Schema<UserDoc>({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, default: "attendee" },
});

export default model<UserDoc>("User", UserSchema);
