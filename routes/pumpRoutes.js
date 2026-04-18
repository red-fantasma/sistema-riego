import Irrigation from "../models/Irrigation.js";

// Estado global (igual que en sensorController)
let pumpState = "OFF";

export const controlPump = async (req, res) => {
  try {
    const { action } = req.body;

    if (action === "ON") {
      pumpState = "ON";

      await new Irrigation({
        duration: 10,
        trigger: "manual"
      }).save();

    } else {
      pumpState = "OFF";
    }

    res.json({
      message: `Bomba ${pumpState}`,
      pumpActive: pumpState === "ON"
    });

  } catch (error) {
    res.status(500).json({
      message: "Error controlando bomba",
      error: error.message
    });
  }
};

// 👇 EXPORTAMOS ESTADO para usar en sensorController
export const getPumpState = () => pumpState;