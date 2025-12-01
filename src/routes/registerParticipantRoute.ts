import { Router } from "express";
import { registerParticipant } from "../controllers/registerController.ts";

const router = Router();

//router.post("/:eventId/:userId", registerParticipant);
router.post("/", registerParticipant);

export default router;
