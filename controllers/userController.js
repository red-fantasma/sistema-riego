import User from "../models/User.js";

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 🔥 Validación
    if (!email || !password) {
      return res.status(400).json({
        message: "Email y contraseña son requeridos"
      });
    }

    const user = await User.findOne({ email });

    // 🔥 Usuario no existe
    if (!user) {
      return res.status(401).json({
        message: "Usuario no encontrado"
      });
    }

    // 🔥 Contraseña incorrecta
    if (user.password !== password) {
      return res.status(401).json({
        message: "Contraseña incorrecta"
      });
    }

    // 🔥 Respuesta simple
    res.json({
      token: "123456",
      email: user.email
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};  