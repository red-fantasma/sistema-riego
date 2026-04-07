// middleware/authMiddleware.js
import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  // 1. Obtenemos el encabezado
  const authHeader = req.headers["authorization"];

  // 2. Verificamos si existe el encabezado y si empieza con "Bearer "
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json({ message: "Token requerido o formato incorrecto" });
  }

  // 3. Extraemos solo el código largo (quitamos "Bearer ")
  const token = authHeader.split(" ")[1];

  try {
    // 4. Ahora sí verificamos solo el token limpio
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Token inválido" });
  }
};