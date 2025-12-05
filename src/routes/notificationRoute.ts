import {
  getNotifications,
  markAsRead,
  addNotification,
  deleteNotification,
} from "../controllers/notificationController.ts";

import express from "express";
const router = express.Router();

router.get("/", getNotifications);
router.post("/", addNotification);
router.post("/:id", markAsRead);
router.delete("/:id", deleteNotification);
export default router;
