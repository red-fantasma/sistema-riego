import Settings from "../models/Settings.js";

// obtener configuración
export const getSettings = async (req, res) => {
  const settings = await Settings.findOne();
  res.json(settings);
};

// actualizar configuración
export const updateSettings = async (req, res) => {
  const { minTemp, maxTemp } = req.body;

  const updated = await Settings.findOneAndUpdate(
    {},
    { minTemp, maxTemp },
    { new: true, upsert: true }
  );

  res.json(updated);
};