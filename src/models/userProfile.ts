// models/userProfile.ts
import { Schema, model, Document } from "mongoose";

export interface UserProfileDocument extends Document {
  authId: string;
  username: string;
  email: string;
  title?: string;
  address?: string;
  role: "participant" | "organizer" | "admin" | "ticketchecker";
  avatar?: string;
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
      enum: ["participant", "organizer", "admin", "ticketchecker"],
      default: "participant",
      avatar: { type: String }, // store file path
    },
  },
  { timestamps: true }
);

export const UserProfile = model<UserProfileDocument>(
  "UserProfile",
  UserProfileSchema
);
