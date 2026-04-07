import Sensor from "../models/Sensor.js";
import Irrigation from "../models/Irrigation.js";
import { shouldIrrigate } from "../services/irrigationService.js";

let pumpState = "OFF";

export const addSensorData = async (req, res) => {
  const { temperature } = req.body;

  // guardar lectura
  const newSensor = new Sensor({ temperature });
  await newSensor.save();

  // decidir si regar
  const irrigate = await shouldIrrigate(temperature);

  if (irrigate) {
    pumpState = "ON";

    // guardar evento automático
    const irrigation = new Irrigation({
      duration: 10,
      trigger: "automatic"
    });

    await irrigation.save();
  }

  res.json({
    message: "Dato recibido",
    temperature,
    irrigationActivated: irrigate
  });
};