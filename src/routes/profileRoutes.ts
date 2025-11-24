import { Router } from "express";
import { getProfile, updateProfile } from "#controllers/profileController.ts";
import { requireAuth } from "#middlewares/requireAuth.ts";
import validateBodyZod from "#middlewares/validateBodyZod.ts";
import { updateProfileSchema } from "#schemas/userSchemas.ts";

const profileRouter = Router();

profileRouter.get("/", requireAuth, getProfile);
profileRouter.put(
  "/",
  requireAuth,
  validateBodyZod(updateProfileSchema),
  updateProfile
);

export default profileRouter;
