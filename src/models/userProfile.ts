import { Schema, model, Document, Types } from "mongoose";

export interface UserProfileDocument extends Document {
  authId: Types.ObjectId;
  username: string;
  email: string;
  title?: string;
  address?: string;
  role: "participant" | "organizer" | "admin";
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserProfileSchema = new Schema<UserProfileDocument>(
  {
    authId: { type: Schema.Types.ObjectId, ref: "AuthUser", required: true },

    username: { type: String, required: true },
    email: { type: String, required: true },

    title: { type: String },
    address: { type: String },

    role: {
      type: String,
      enum: ["participant", "organizer", "admin"],
      default: "participant",
    },

    avatar: { type: String },
  },
  { timestamps: true }
);

export const UserProfile = model<UserProfileDocument>(
  "UserProfile",
  UserProfileSchema
);
