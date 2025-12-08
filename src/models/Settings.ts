import { Schema, model } from "mongoose";

const SettingsSchema = new Schema({
  siteName: String,
  maintenanceMode: Boolean,
  notificationEmail: String,
});

export default model("Settings", SettingsSchema);
