import type { RequestHandler } from "express";
import bcrypt from "bcryptjs";
import { UserProfile } from "#models/userProfile.ts";
import { AuthUser } from "#models/authUser.ts";
import { auth } from "#auth/auth.ts";
import { fromNodeHeaders } from "better-auth/node";
import fs from "fs";
import path from "path";
import { updateProfileSchema } from "#schemas/userSchemas.ts";
import { console } from "inspector";

export const getProfile: RequestHandler = async (req, res) => {
  try {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });
    if (!session) return res.status(401).json({ error: "Unauthorized" });

    const authId = session.user.id;
    const profile = await UserProfile.findOne({ authId }).lean();
    if (!profile) return res.status(404).json({ error: "Profile not found" });

    const avatarUrl = profile.avatar
      ? `${process.env.VITE_PULSE_BACKEND_API_URL}/uploads/${profile.avatar}`
      : null;

    res.json({ ...profile, avatar: avatarUrl });
  } catch (err) {
    console.error(err);
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
    const { username, password, currentPassword } = req.body;
    const avatarFile = req.file;
    let profile = await UserProfile.findOne({ authId });
    let authRecord = await AuthUser.findOne({ authId });
    if (!authRecord) {
      authRecord = await AuthUser.create({
        authId,
        email: session.user.email,
        role: "participant",
      });
    }

    if (!profile) {
      profile = await UserProfile.create({
        authId,
        username: session.user.email.split("@")[0],
        email: session.user.email,
        role: "participant",
      });
    }

    if (!authRecord)
      return res.status(404).json({ error: "Auth record not found" });

    if (username) profile.username = username;

    if (password && currentPassword)
      authRecord.passwordHash = await bcrypt.hash(password, 10);
    if (avatarFile) profile.avatar = avatarFile.filename;

    await profile.save();
    await authRecord.save();

    const headers = fromNodeHeaders(req.headers);

    if (username || avatarFile) {
      await auth.api.updateUser({
        body: { name: username, image: avatarFile?.filename },
        method: "POST",
        params: { userId: authId },
        headers,
      });
    }

    if (password && currentPassword) {
      await auth.api.changePassword({
        body: {
          currentPassword,
          newPassword: password,
          revokeOtherSessions: false,
        },
        method: "POST",
        headers,
      });
    }

    res.json({ message: "Profile updated", profile });
  } catch (err) {
    console.error("PUT /profile error:", err);
    res.status(500).json({ error: "Server error" });
  }
};
export const deleteProfile: RequestHandler = async (req, res) => {
  try {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });
    if (!session) return res.status(401).json({ error: "Unauthorized" });

    const authId = session.user.id;

    const profile = await UserProfile.findOne({ authId });
    if (!profile) return res.status(404).json({ error: "Profile not found" });

    if (profile.avatar) {
      const avatarPath = path.join(__dirname, "../uploads", profile.avatar);
      if (fs.existsSync(avatarPath)) {
        fs.unlinkSync(avatarPath);
      }
    }

    await UserProfile.deleteOne({ authId });
    await AuthUser.deleteOne({ authId });

    await auth.api.signOut({ headers: fromNodeHeaders(req.headers) });

    return res.json({ message: "Profile deleted successfully" });
  } catch (err) {
    console.error("DELETE /profile error:", err);
    return res.status(500).json({ error: "Server error" });
  }
};
export const syncProfile: RequestHandler = async (req, res) => {
  try {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });
    if (!session?.user) return res.status(401).json({ error: "Unauthorized" });

    const authId = session.user.id;

    let authRecord = await AuthUser.findById(authId);
    if (!authRecord) {
      authRecord = await AuthUser.create({
        _id: authId,
        authId,
        email: session.user.email,
        role: "participant",
      });
    }

    let profile = await UserProfile.findOne({ authId });
    if (!profile) {
      profile = await UserProfile.create({
        authId,
        username: session.user.name || session.user.email.split("@")[0],
        email: session.user.email,
        role: "participant",
      });
    }

    res.status(200).json({ profile, authRecord });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
