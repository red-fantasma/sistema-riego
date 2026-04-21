import express from "express";
import { controlPump } from "../controllers/pumpController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/control", verifyToken, controlPump);
router.get("/status", getPumpStatus); // ← sin token, ESP32 lo consulta directo

export default router;