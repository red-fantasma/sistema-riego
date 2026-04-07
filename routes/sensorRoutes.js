import express from "express";
import { addSensorData } from "../controllers/sensorController.js";

const router = express.Router();

router.post("/", addSensorData);

export default router;