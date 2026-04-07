import Irrigation from "../models/Irrigation.js";

let pumpState = "OFF";

export const controlPump = async (req, res) => {
  const { state } = req.body;

  pumpState = state;

  // si se enciende, guardar riego
  if (state === "ON") {
    const newIrrigation = new Irrigation({
      duration: 10, // puedes mejorar esto luego
      trigger: "manual"
    });

    await newIrrigation.save();
  }

  res.json({
    message: `Pump ${state}`,
    state
  });
};