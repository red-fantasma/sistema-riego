import Sensor from "../models/Sensor.js";
import Irrigation from "../models/Irrigation.js";
import { shouldIrrigate } from "../services/irrigationService.js";

let pumpState = "OFF";

/**
 * 📌 Recibir datos del ESP32 SIN autenticación
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

    // Guardar en MongoDB
    const newSensor = new Sensor({
      temperature,
      device: deviceId || "ESP32_DEFAULT"
    });

    await newSensor.save();

    // Lógica de riego automático
    const irrigate = await shouldIrrigate(temperature);

    if (irrigate) {
      pumpState = "ON";

      await new Irrigation({
        duration: 10,
        trigger: "automatic"
      }).save();
    } else {
      pumpState = "OFF";
    }

    res.json({
      message: "Dato recibido correctamente",
      temperature,
      device: deviceId,
      irrigationActivated: irrigate,
      pumpState
    });

  } catch (error) {
    res.status(500).json({
      message: "Error al guardar datos",
      error: error.message
    });
  }
};


/**
 * 📌 Registrar dispositivo (opcional)
 */
export const addSensorDevice = async (req, res) => {
  try {
    const { name, location } = req.body;

    const device = {
      name: name || "ESP32",
      location: location || "Sin ubicación",
      createdAt: new Date()
    };

    res.json({
      message: "Dispositivo registrado",
      device
    });

  } catch (error) {
    res.status(500).json({
      message: "Error al registrar dispositivo",
      error: error.message
    });
  }
};