import { username } from "better-auth/plugins";
import { z } from "zod";

export const userSchema = z.strictObject({
  email: z.string().email({ message: "Invalid email address" }),
  fullName: z.string().min(1, { message: "Full name is required" }),
  role: z
    .enum(["participant", "organizer", "admin", "ticketchecker"])
    .optional(),
});
export const updateProfileSchema = z.strictObject({
  username: z.string().optional(),
  email: z.string().email().optional(),
  password: z.string().min(6).optional(),
});
