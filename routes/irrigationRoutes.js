import express from "express";
import Irrigation from "../models/Irrigation.js";

const router = express.Router();

// Obtener historial de riegos
router.get("/history", async (req, res) => {
  try {
    const riegos = await Irrigation.find().sort({ date: -1 });
    res.json(riegos);
  } catch (error) {
    res.status(500).json({ message: "Error obteniendo riegos", error: error.message });
  }
});

export default router;