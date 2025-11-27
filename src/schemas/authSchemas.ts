import { z } from "zod";

export const registerSchema = z.strictObject({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" })
    .regex(/[A-Z]/, { message: "Password must contain an uppercase letter" })
    .regex(/[a-z]/, { message: "Password must contain a lowercase letter" })
    .regex(/[0-9]/, { message: "Password must contain a number" })
    .regex(/[^A-Za-z0-9]/, {
      message: "Password must contain a special character",
    }),
  username: z.string().min(1, { message: "Full name is required" }),
  title: z.string().min(1, { message: "Title is required" }).optional(),
  address: z.string().min(1, { message: "Address is required" }).optional(),
  role: z.string().min(1, { message: "Role is required" }).optional(),
});

export const loginSchema = z.strictObject({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
});
