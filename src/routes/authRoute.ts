import { Router } from "express";
import { toNodeHandler } from "better-auth/node";
import { auth } from "#auth/auth.ts";

const authRouter = Router();

authRouter.use("/native", toNodeHandler(auth));
export default authRouter;
