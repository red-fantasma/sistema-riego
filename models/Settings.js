import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema({
  minTemp: Number,
  maxTemp: Number
});

export default mongoose.model("Settings", settingsSchema);