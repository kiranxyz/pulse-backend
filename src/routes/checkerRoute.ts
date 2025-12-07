import { Router } from "express";
import * as checker from "../controllers/checkerController.ts";
import { requireAuth } from "#middlewares/requireAuth.ts";
import { requireRole } from "#middlewares/requireRole.ts";

const router = Router();

router.get(
  "/:id/analytics",
  requireAuth,
  requireRole(["ticketchecker", "admin"]),
  checker.analytics
);
router.post(
  "/:id/checkin",
  requireAuth,
  requireRole(["ticketchecker", "admin"]),
  checker.doCheckIn
);

export default router;
