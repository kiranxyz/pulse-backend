import { Router } from "express";
import { loginUser, getLoggedUser } from "../controllers/authController.ts";
const router = Router();
router.get("/me", getLoggedUser);
router.post("/login", loginUser);
export default router;
