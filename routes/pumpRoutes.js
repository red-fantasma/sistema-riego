import express from "express";
import { controlPump, getPumpStatus } from "../controllers/pumpController.js"; // ← ambos
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/control", verifyToken, controlPump);
router.get("/status", getPumpStatus); // ← sin token

export default router;