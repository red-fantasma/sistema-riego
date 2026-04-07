// models/Irrigation.js
import mongoose from "mongoose";

const irrigationSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now
  },
  duration: Number,
  trigger: String
});

export default mongoose.model("Irrigation", irrigationSchema);