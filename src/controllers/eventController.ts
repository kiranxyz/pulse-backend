import Event from "#models/event.ts";
import { Request, Response } from "express";

// GET all events
export const getEvents = async (req: Request, res: Response) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};
// CREATE new event
export const createEvent = async (req: Request, res: Response) => {
  try {
    const event = new Event(req.body);
    console.log(
      "Coordinate in req body:",
      req.body.latitude,
      req.body.longitude
    );
    const savedEvent = await event.save();
    res.status(201).json(savedEvent);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};
// UPDATE event
export const updateEvent = async (req: Request, res: Response) => {
  try {
    const updated = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};
// DELETE event
export const deleteEvent = async (req: Request, res: Response) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: "Event deleted" });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};
export const getEventById = async (req: Request, res: Response) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
