import { Schema, model, Document } from "mongoose";

export interface AuthUserDocument extends Document {
  authId: string;
  email: string;
  passwordHash?: string;
  role: "participant" | "organizer" | "admin" | "ticketchecker" | "guest";
  provider?: string;
  providerId?: string;
  createdAt: Date;
  updatedAt: Date;
}

const AuthUserSchema = new Schema<AuthUserDocument>(
  {
    authId: { type: String, required: true, unique: true },

    email: { type: String, required: true, unique: true },
    passwordHash: { type: String },
    role: {
      type: String,
      enum: ["participant", "organizer", "admin", "ticketchecker"],
      default: "guest",
    },
    provider: { type: String },
    providerId: { type: String },
  },
  { timestamps: true }
);

export const AuthUser = model<AuthUserDocument>("AuthUser", AuthUserSchema);
