import { Router } from "express";
import {
  getProfile,
  updateProfile,
  deleteProfile,
  syncProfile,
} from "#controllers/profileController.ts";

import { requireAuth } from "#middlewares/requireAuth.ts";
import { upload } from "#middlewares/upload.ts";

const profileRouter = Router();
profileRouter.use(requireAuth);

profileRouter.get("/", getProfile);
profileRouter.put(
  "/",
  (req, res, next) => {
    console.log("PUT /profile hit", req.body, req.file);
    next();
  },
  upload.single("avatar"),
  updateProfile
);

profileRouter.delete("/", deleteProfile);
profileRouter.post("/sync", syncProfile);

export default profileRouter;
