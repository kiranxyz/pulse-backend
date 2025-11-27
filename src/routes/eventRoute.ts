import { Router } from "express";
import Event from "../models/event"; 
import { getEvents, createEvent, updateEvent, deleteEvent, getEventById } from "../controllers/eventController";


const router = Router();


router.get("/events", getEvents);
router.post("/events", createEvent);
router.put("/events/:id", updateEvent);
router.delete("/events/:id", deleteEvent);

// Event details
router.get("/events/:id", getEventById);

export default router;
