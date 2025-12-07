import { Router } from "express";
import * as profileCtrl from "#controllers/profileController.ts";
import { requireAuth } from "#middlewares/requireAuth.ts";
import { requireRole } from "#middlewares/requireRole.ts";
import * as authCtrl from "#controllers/authController.ts";

const router = Router();

router.get("/stats", requireAuth, requireRole(["admin"]), authCtrl.stats);
router.get(
  "/users",
  requireAuth,
  requireRole(["admin", "organizer"]),
  profileCtrl.listUsers
);
router.post(
  "/users/:id/toggle",
  requireAuth,
  requireRole(["admin"]),
  profileCtrl.toggleUserActive
);

export default router;
