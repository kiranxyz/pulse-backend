import { Request, Response, NextFunction } from "express";
import { fromNodeHeaders } from "better-auth/node";
import { auth } from "../auth/auth.ts";

export interface AuthRequest extends Request {
  user?: any;
  authSession?: any;
}

export async function requireAuth(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });

    if (!session) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    (req as any).user = session.user;
    (req as any).authSession = session.session;

    next();
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
}
