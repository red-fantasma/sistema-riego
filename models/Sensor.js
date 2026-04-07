import mongoose from "mongoose";

const sensorSchema = new mongoose.Schema({
  temperature: Number,
  date: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Sensor", sensorSchema);