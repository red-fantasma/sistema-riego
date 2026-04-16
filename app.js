import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

// importar rutas
import authRoutes from "./routes/authRoutes.js";
import pumpRoutes from "./routes/pumpRoutes.js";
import sensorRoutes from "./routes/sensorRoutes.js";
import settingsRoutes from "./routes/settingsRoutes.js";
import backupRoutes from "./routes/backupRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();


// middlewares
app.use(cors());
app.use(express.json());

// rutas principales
app.use("/api/auth", authRoutes);
app.use("/api/pump", pumpRoutes);
app.use("/api/sensors", sensorRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/backup", backupRoutes);
app.use("/api/users", userRoutes);
// ruta de prueba
app.get("/", (req, res) => {
  res.send("API de riego funcionando 🚀");
});

// conexión a MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Base de datos conectada"))
  .catch((error) => console.log("❌ Error DB:", error));

// puerto
const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0',() => {
  console.log(`🔥 Servidor corriendo en puerto ${PORT}`);
});