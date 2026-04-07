import express from "express";
import { controlPump } from "../controllers/pumpController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// 🔒 AQUÍ se protege la ruta
router.post("/", verifyToken, controlPump);

export default router;