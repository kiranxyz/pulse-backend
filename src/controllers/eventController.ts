import { Event } from "../models/event";

// GET all events
export const getEvents = async (req: any, res: any) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err: any) {
    res.json({ status: 500, message: err.message });
  }
};

// CREATE new event
export const createEvent = async (req: any, res: any) => {
  try {
    const event = new Event(req.body);
    console.log("Coordinates:", req.body.latitude, req.body.longitude);
    const savedEvent = await event.save();
    res.json({ status: 201, data: savedEvent });
  } catch (err: any) {
    res.json({ status: 400, message: err.message });
  }
};

// UPDATE event
export const updateEvent = async (req: any, res: any) => {
  try {
    const updated = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.json({ status: 404, message: "Event not found" });
    res.json({ status: 200, data: updated });
  } catch (err: any) {
    res.json({ status: 400, message: err.message });
  }
};

// DELETE event
export const deleteEvent = async (req: any, res: any) => {
  try {
    const deleted = await Event.findByIdAndDelete(req.params.id);
    if (!deleted) return res.json({ status: 404, message: "Event not found" });
    res.json({ status: 200, message: "Event deleted" });
  } catch (err: any) {
    res.json({ status: 400, message: err.message });
  }
};

// GET event by ID
export const getEventById = async (req: any, res: any) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.json({ status: 404, message: "Event not found" });
    res.json({ status: 200, data: event });
  } catch (err: any) {
    res.json({ status: 500, message: err.message });
  }
};
