// src/routes/checkinRoute.ts
import { Router } from "express";
import { doCheckIn } from "#controllers/checkerController.ts";
import { requireAuth } from "#middlewares/requireAuth.ts";
import { requireRole } from "#middlewares/requireRole.ts";

const router = Router();
router.post(
  "/",
  requireAuth,
  requireRole(["ticketchecker", "admin"]),
  doCheckIn
);

export default router;
