import { Router } from "express";
import {
  register,
  login,
  logout,
  getSession,
} from "#controllers/authController.ts";
import validateBodyZod from "#middlewares/validateBodyZod.ts";
import { registerSchema, loginSchema } from "#schemas/authSchemas.ts";

const authRouter = Router();
authRouter.post("/register", validateBodyZod(registerSchema), register);
authRouter.post("/login", validateBodyZod(loginSchema), login);
authRouter.post("/logout", logout);
authRouter.get("/session", getSession);

export default authRouter;
