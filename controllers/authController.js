import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// --- LOGIN ---
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 🔍 Buscar por email (NO username)
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      email: user.email,
      user: {
        id: user._id,
        role: user.role
      }
    });

  } catch (error) {
    res.status(500).json({ message: "Error en el servidor durante el login" });
  }
};

// --- REGISTRO ---
export const register = async (req, res) => {
  const { username, password } = req.body;

  try {
    // 1. Verificar si el usuario ya existe
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "El nombre de usuario ya está en uso" });
    }

    // 2. Encriptar contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Guardar usuario
    const newUser = new User({
      username,
      password: hashedPassword,
      role: "user" // Por defecto
    });

    await newUser.save();

    res.status(201).json({ message: "Usuario creado correctamente" });

  } catch (error) {
    console.error(error); // Útil para debug
    res.status(500).json({ message: "Error al registrar usuario" });
  }
}; // <-- Aquí faltaba cerrar la función