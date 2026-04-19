import express from "express";
import { controlPump } from "../controllers/pumpController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * 🔘 Control manual de la bomba
 * 🔒 Protegido con token (solo usuarios logueados)
 * 
 * Body esperado:
 * {
 *   "action": "ON"  // o "OFF"
 * }
 */
router.post("/", verifyToken, controlPump);

export default router;