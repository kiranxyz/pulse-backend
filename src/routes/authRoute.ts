import { Router } from "express";
import {
  register,
  login,
  logout,
  getSession,
} from "#controllers/authController.ts";
import validateBodyZod from "#middlewares/validateBodyZod.ts";
import { registerSchema, loginSchema } from "#schemas/authSchemas.ts";
import { toNodeHandler, fromNodeHeaders } from "better-auth/node";
import { auth } from "#auth/auth.ts";

const authRouter = Router();
console.log("Setting up auth routes");
/*authRouter.post(
  "/register",
  validateBodyZod(registerSchema),
  register,
  toNodeHandler(auth)
);
authRouter.post(
  "/login",
  validateBodyZod(loginSchema),
  login,
  toNodeHandler(auth)
);
authRouter.post("/logout", logout);
authRouter.get("/session", getSession);*/

// Native Better Auth endpoints – auto cookie handling
authRouter.use("/native", toNodeHandler(auth));
export default authRouter;
