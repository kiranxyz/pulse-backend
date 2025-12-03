import { Router } from "express";
import { getEvents, createEvent, updateEvent, deleteEvent, getEventById } from "#controllers/eventController.ts";


const router = Router();


router.get("/", getEvents);
router.post("/", createEvent);
router.put("/:id", updateEvent);
router.delete("/:id", deleteEvent);

// Event details
router.get("/:id", getEventById);

export default router;
