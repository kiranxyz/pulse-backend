import type { RequestHandler } from "express";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { AuthUser } from "#models/authUser.ts";
import { UserProfile } from "#models/userProfile.ts";
import { auth } from "#auth/auth.ts";
import { fromNodeHeaders } from "better-auth/node";
import { registerSchema, loginSchema } from "#schemas/authSchemas.ts";

type RegisterInput = z.infer<typeof registerSchema>;
type LoginInput = z.infer<typeof loginSchema>;

export const register: RequestHandler<unknown, RegisterInput[]> = async (
  req,
  res
) => {
  try {
    const parsed = registerSchema.safeParse(req.body);

    if (!parsed.success) return res.status(400).json();

    const { email, password, username, title, address, role } = parsed.data;

    let authUser;
    try {
      authUser = await auth.api.signUpEmail({
        body: { name: username, email, password },
      });
    } catch (err: any) {
      if (err.body?.code === "EMAIL_ALREADY_EXISTS") {
        return res.status(400).json();
      }
      throw err;
    }

    const profile = await UserProfile.create({
      authId: authUser.user.id,
      username,
      email,
      title,
      address,
      role,
    });
    res.status(201).json();
  } catch (err) {
    console.error(err);
  }
};

export const login: RequestHandler<unknown, LoginInput[]> = async (
  req,
  res
) => {
  try {
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json();

    const { email, password } = parsed.data;

    const session = await auth.api.signInEmail({ body: { email, password } });
    res.json();
  } catch (err) {
    console.error(err);
  }
};

export const logout: RequestHandler = async (req, res) => {
  try {
    await auth.api.signOut({ headers: fromNodeHeaders(req.headers) });
    res.json({ message: "Logged out successfully" });
  } catch (err) {
    console.error(err);
  }
};

export const getSession: RequestHandler<unknown, any> = async (req, res) => {
  try {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });
    res.json(session || { user: null });
  } catch (err) {
    console.error(err);
  }
};
