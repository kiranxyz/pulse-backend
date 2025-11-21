import { Router } from "express";
import { loginUser } from "../controllers/authController.ts";

const router = Router();

router.post("/login", loginUser);

export default router;
