import { Schema, model, Document } from "mongoose";

export interface UserDoc extends Document {
  name: string;
  email: string;
  password: string;
  role: "participant" | "organizer" | "admin" | "ticketchecker";
  events: Schema.Types.ObjectId[];
  active: boolean;
}

const UserSchema = new Schema<UserDoc>({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: {
    type: String,
    enum: ["admin", "organizer", "ticketchecker", "participant"],
  },
  events: [{ type: Schema.Types.ObjectId, ref: "Event" }],
  active: { type: Boolean, default: true },
});

export default model<UserDoc>("User", UserSchema);
