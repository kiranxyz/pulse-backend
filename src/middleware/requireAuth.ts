import { Request, Response, NextFunction } from "express";
export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {


  return res
    .status(401)
    .json({ error: "Not authenticated. TO BE IMPLEMENTED." });
};
