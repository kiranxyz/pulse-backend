import { Request, Response, NextFunction } from "express";

export const requireRole = (role: "attendee" | "organizer" | "admin") => {
  return (req: Request, res: Response, next: NextFunction) => {
  

    return res.status(403).json({
      error: `Requires ${role} role — TO BE IMPLEMENTED`,
    });
  };
};
