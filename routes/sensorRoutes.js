import express from "express";
import {
  addSensorDevice,
  getLatestSensor,
  updateThreshold
} from "../controllers/sensorController.js";

const router = express.Router();

// 📌 Ruta exclusiva para ESP32 (SIN TOKEN)
router.post("/device", addSensorDevice);

// 📊 Obtener último dato (frontend)
router.get("/latest", getLatestSensor);

// 🌡️ Cambiar umbral desde app
router.post("/threshold", updateThreshold);

export default router;