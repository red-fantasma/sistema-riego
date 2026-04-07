import mongoose from "mongoose";

const backupSchema = new mongoose.Schema({
  sensors: Array,
  irrigations: Array,
  date: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Backup", backupSchema);