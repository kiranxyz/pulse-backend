import { Request, Response, NextFunction } from "express";
import { AuthUser } from "#models/authUser.ts";
import { AuthRequest } from "./requireAuth.ts";

const DEBUG = true;

// Hierarchy (higher = more power)
const ROLE_LEVEL: Record<string, number> = {
  participant: 1,
  ticketchecker: 2,
  organizer: 3,
  admin: 4,
};

export const requireRole = (
  allowedRoles: ("participant" | "organizer" | "admin" | "ticketchecker")[]
) => {
  return async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      // ⛔ No authentication
      if (!req.user) {
        return res.status(401).json({
          error: "AUTH_REQUIRED",
          message: "You must be logged in to access this resource.",
        });
      }

      const authId = req.user.id;

      // 🔍 Fetch actual role from DB (never trust client)
      const authRecord = await AuthUser.findOne({ authId }).lean();

      if (!authRecord) {
        return res.status(403).json({
          error: "AUTH_RECORD_MISSING",
          message:
            "Your account exists but your role record is missing. Contact support.",
        });
      }

      const userRole = authRecord.role || "participant";

      if (DEBUG) {
        console.log("\n===== ROLE CHECK =====");
        console.log("ROUTE:", req.method, req.originalUrl);
        console.log("USER:", req.user.email);
        console.log("ROLE:", userRole);
        console.log("ALLOWED:", allowedRoles);
      }

      // 🔐 Compare using hierarchy
      /* const userLevel = ROLE_LEVEL[userRole] || 0;
      const requiredLevel = Math.max(...allowedRoles.map((r) => ROLE_LEVEL[r]));

      if (userLevel < requiredLevel) {
        return res.status(403).json({
          error: "FORBIDDEN",
          message: `You need ${allowedRoles.join(
            " or "
          )} permissions to access this.`,

          userRole,
          requiredRoles: allowedRoles,
        });
      }*/
      next();
    } catch (err) {
      console.error("ERROR in requireRole:", err);
      return res.status(500).json({
        error: "ROLE_CHECK_FAILED",
        message: "Internal server error during role validation.",
      });
    }
  };
};
