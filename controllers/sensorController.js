import Sensor from "../models/Sensor.js";
import Irrigation from "../models/Irrigation.js";
import { shouldIrrigate } from "../services/irrigationService.js";

let pumpState = "OFF";

/**
 * 📌 Registrar datos del sensor
 */
export const addSensorData = async (req, res) => {
  try {
    const { temperature, deviceId } = req.body;

    // Validación básica
    if (temperature === undefined) {
      return res.status(400).json({
        message: "La temperatura es requerida"
      });
    }

    // Guardar lectura con referencia al dispositivo
    const newSensor = new Sensor({
      temperature,
      device: deviceId || null
    });

    await newSensor.save();

    // Decidir si se activa el riego
    const irrigate = await shouldIrrigate(temperature);

    if (irrigate) {
      pumpState = "ON";

      const irrigation = new Irrigation({
        duration: 10,
        trigger: "automatic"
      });

      await irrigation.save();
    } else {
      pumpState = "OFF";
    }

    res.json({
      message: "Dato recibido correctamente",
      temperature,
      deviceId,
      irrigationActivated: irrigate,
      pumpState
    });

  } catch (error) {
    res.status(500).json({
      message: "Error al guardar datos del sensor",
      error: error.message
    });
  }
};


/**
 * 📌 Registrar dispositivo
 */
export const addSensorDevice = async (req, res) => {
  try {
    const { name, location } = req.body;

    // Validación
    if (!name || !location) {
      return res.status(400).json({
        message: "Nombre y ubicación son requeridos"
      });
    }

    // Aquí puedes guardar en MongoDB si luego creas un modelo Device
    const device = {
      name,
      location,
      createdAt: new Date()
    };

    res.json({
      message: "Dispositivo registrado correctamente",
      device
    });

  } catch (error) {
    res.status(500).json({
      message: "Error al registrar dispositivo",
      error: error.message
    });
  }
};