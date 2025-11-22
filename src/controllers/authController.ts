import { Request, Response, NextFunction } from "express";

export const loginUser = async (
  eq: Request,
  res: Response,
  next: NextFunction
) => {
  // TODO: implement login logic
  res.json({ message: "loginUser: TO BE IMPLEMENTED" });
};

export const getLoggedUser = async (
  eq: Request,
  res: Response,
  next: NextFunction
) => {
  const user = {
    id: 1,
    name: "Test Test",
    email: "test@example.com",
  };

  res.json({ message: "User fetched successfully", user });
};

export default loginUser;
