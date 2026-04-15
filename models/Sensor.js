import mongoose from "mongoose";

const sensorSchema = new mongoose.Schema({
  deviceId: String,
  temperature: Number,
  humidity: Number,
  date: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Sensor", sensorSchema);