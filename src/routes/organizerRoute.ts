import { Router } from "express";
import * as ctrl from "../controllers/organizerController.ts";
import { requireAuth } from "#middlewares/requireAuth.ts";
import { requireRole } from "#middlewares/requireRole.ts";

const router = Router();
router.get(
  "/:id/analytics",
  requireAuth,
  requireRole(["organizer"]),
  ctrl.analytics
);

router.get(
  "/events",
  requireAuth,
  requireRole(["organizer"]),
  ctrl.organizerEvents
);
router.get(
  "/checkers",
  requireAuth,
  requireRole(["organizer"]),
  ctrl.organizerCheckers
);

router.get("/users", requireAuth, requireRole(["organizer"]), ctrl.listUsers);

router.post(
  "/users/:id/toggle",
  requireAuth,
  requireRole(["organizer"]),
  ctrl.toggleUserActive
);
router.post(
  "/checkers",
  requireAuth,
  requireRole(["organizer"]),
  ctrl.addChecker
);

export default router;
