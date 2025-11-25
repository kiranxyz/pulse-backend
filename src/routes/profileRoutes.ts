// routes/profileRoutes.ts
import { Router } from "express";
import { getProfile, updateProfile } from "#controllers/profileController.ts";
import validateBodyZod from "#middlewares/validateBodyZod.ts";
import { updateProfileSchema } from "#schemas/userSchemas.ts";
import { requireAuth } from "#middlewares/requireAuth.ts";

const profileRouter = Router();
profileRouter.use(requireAuth);

profileRouter.get("/", getProfile);

profileRouter.put("/", validateBodyZod(updateProfileSchema), updateProfile);

export default profileRouter;
