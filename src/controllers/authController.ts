import { Request, Response, NextFunction } from "express";

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  
  res.json({ message: "loginUser: TO BE IMPLEMENTED" });
};

export default loginUser;
