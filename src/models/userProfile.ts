import { Schema, model, Document } from "mongoose";

export interface UserProfileDocument extends Document {
  authId: string;
  username: string;
  email: string;
  title?: string;
  address?: string;
  role: "participant" | "organizer" | "admin" | "ticketchecker" | "guest";
  avatar?: string;
  active: boolean;
  events: string[];
}

const UserProfileSchema = new Schema<UserProfileDocument>(
  {
    authId: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    title: String,
    address: String,
    role: {
      type: String,
      enum: ["participant", "organizer", "admin", "ticketchecker", "guest"],
      default: "participant",
      avatar: { type: String },
    },
    active: Boolean,
    events: { type: [String], default: [] },
  },
  { timestamps: true }
);
export default model<UserProfileDocument>("UserProfile", UserProfileSchema);
