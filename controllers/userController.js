import User from "../models/User.js";

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(401).json({
        message: "Credenciales incorrectas"
      });
    }

    res.json({
      token: "123456", // simple por ahora
      user: {
        email: user.email
      }
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};