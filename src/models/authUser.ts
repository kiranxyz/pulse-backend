import { Schema, model, Document } from "mongoose";

export interface AuthUserDocument extends Document {
  email: string;
  passwordHash?: string;
  role: "participant" | "organizer" | "admin";
  provider?: string;
  providerId?: string;
  createdAt: Date;
  updatedAt: Date;
}

const AuthUserSchema = new Schema<AuthUserDocument>(
  {
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String },
    role: {
      type: String,
      enum: ["participant", "organizer", "admin"],
      default: "participant",
    },
    provider: { type: String },
    providerId: { type: String },
  },
  { timestamps: true }
);

export const AuthUser = model<AuthUserDocument>("AuthUser", AuthUserSchema);
