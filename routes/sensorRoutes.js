import express from "express";
import { addSensorDevice } from "../controllers/sensorController.js";

const router = express.Router();

// 📌 Ruta exclusiva para ESP32 (SIN TOKEN)
router.post("/device", addSensorDevice);

export default router;