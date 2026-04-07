import Sensor from "../models/Sensor.js";
import Irrigation from "../models/Irrigation.js";
import Backup from "../models/Backup.js";

export const createBackup = async (req, res) => {
  try {
    const sensors = await Sensor.find();
    const irrigations = await Irrigation.find();

    const backup = new Backup({
      sensors,
      irrigations
    });

    await backup.save();

    res.json({
      message: "Backup creado correctamente"
    });

  } catch (error) {
    res.status(500).json({
      message: "Error al crear backup"
    });
  }
};