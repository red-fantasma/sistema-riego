import express from "express";
// Importamos AMBOS: login y register
import { login, register } from "../controllers/authController.js";

const router = express.Router();

// Ruta para iniciar sesión
router.post("/login", login);

// Ruta para crear un nuevo usuario (ESTA ES LA QUE TE FALTABA)
router.post("/register", register);

export default router;