import Irrigation from "../models/Irrigation.js";

let pumpState = "OFF";
let manualTrigger = false; // ← faltaba esta declaración

export const controlPump = async (req, res) => {
  try {
    const { action } = req.body;

    if (action === "ON") {
      pumpState = "ON";
      manualTrigger = true; // ← faltaba esto

      await new Irrigation({
        duration: 10,
        trigger: "manual"
      }).save();

    } else {
      pumpState = "OFF";
      manualTrigger = false;
    }

    res.json({
      message: `Bomba ${pumpState}`,
      pumpActive: pumpState === "ON",
      manual: manualTrigger
    });

  } catch (error) {
    res.status(500).json({
      message: "Error controlando bomba",
      error: error.message
    });
  }
};

export const getPumpState = () => pumpState;

export const getPumpStatus = async (req, res) => {
  try {
    const wasManual = manualTrigger;
    manualTrigger = false;

    res.json({
      pumpActive: pumpState === "ON",
      manual: wasManual
    });
  } catch (error) {
    res.status(500).json({ message: "Error", error: error.message });
  }
};