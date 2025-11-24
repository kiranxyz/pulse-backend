import type { RequestHandler } from "express";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { AuthUser } from "#models/authUser.ts";
import { UserProfile } from "#models/userProfile.ts";
import { updateProfileSchema } from "#schemas/userSchemas.ts";
type UpdateProfileInput = z.infer<typeof updateProfileSchema>;

export const getProfile: RequestHandler<unknown, any> = async (
  req,
  res,
  next
) => {
  try {
    const authUser = (req as any).user;
    if (!authUser) return res.status(401).json({ error: "Unauthorized" });

    const profile = await UserProfile.findOne({ authId: authUser._id }).lean();
    if (!profile) return res.status(404).json({ error: "Profile not found" });

    res.json(profile);
  } catch (err) {
    next(err);
  }
};

export const updateProfile: RequestHandler<
  unknown,
  { message: string; profile: any },
  UpdateProfileInput
> = async (req, res, next) => {
  try {
    const authUser = (req as any).user;
    if (!authUser) return res.status(401).json();

    const parsed = updateProfileSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json();

    const { fullName, email, password } = parsed.data;

    const profile = await UserProfile.findOne({ authId: authUser._id });
    const authRecord = await AuthUser.findById(authUser._id);

    if (!profile || !authRecord) return res.status(404).json();

    if (fullName) profile.username = fullName;
    if (email) {
      profile.email = email;
      authRecord.email = email;
    }
    if (password) authRecord.passwordHash = await bcrypt.hash(password, 10);

    await profile.save();
    await authRecord.save();

    res.json({ message: "Profile updated", profile });
  } catch (err) {
    next(err);
  }
};
