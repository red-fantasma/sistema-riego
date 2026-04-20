import express from "express";
import {
  addSensorDevice,
  getLatestSensor,
  updateThreshold,
  getAllSensors,
  deleteAllSensors,
  deleteLast15Days,
} from "../controllers/sensorController.js";

const router = express.Router();

// 📌 Ruta exclusiva para ESP32 (SIN TOKEN)
router.post("/device", addSensorDevice);

// 📊 Obtener último dato (frontend)
router.get("/latest", getLatestSensor);

// 🌡️ Cambiar umbral desde app
router.post("/threshold", updateThreshold);
// Historial
router.get("/history", getAllSensors);
router.delete("/delete-all", deleteAllSensors);
router.delete("/delete-15days", deleteLast15Days);

export default router;