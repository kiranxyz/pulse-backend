// controllers/profileController.ts
import type { RequestHandler } from "express";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { AuthUser } from "#models/authUser.ts";
import { UserProfile } from "#models/userProfile.ts";
import { updateProfileSchema } from "#schemas/userSchemas.ts";
import { auth } from "#auth/auth.ts";
import { fromNodeHeaders } from "better-auth/node";

type UpdateProfileInput = z.infer<typeof updateProfileSchema>;

export const getProfile: RequestHandler = async (req, res) => {
  try {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });

    if (!session) return res.status(401).json({ error: "Unauthorized" });

    const authId = session.user.id;

    const profile = await UserProfile.findOne({ authId }).lean();
    if (!profile) return res.status(404).json({ error: "Profile not found" });

    res.json(profile);
  } catch (err) {
    console.error("GET /profile error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

export const updateProfile: RequestHandler = async (req, res) => {
  try {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });

    if (!session) return res.status(401).json({ error: "Unauthorized" });

    const authId = session.user.id;

    const parsed = updateProfileSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: parsed.error });

    const { username, email, password, avatar } = parsed.data;

    const profile = await UserProfile.findOne({ authId });
    const authRecord = await AuthUser.findById(authId);

    if (!profile || !authRecord)
      return res.status(404).json({ error: "User not found" });

    if (username) profile.username = username;

    if (email) {
      profile.email = email;
      authRecord.email = email;
    }

    if (password) authRecord.passwordHash = await bcrypt.hash(password, 10);

    await profile.save();
    await authRecord.save();

    res.json({ message: "Profile updated", profile });
  } catch (err) {
    console.error("PUT /profile error:", err);
    res.status(500).json({ error: "Server error" });
  }
};
