import Sensor from "../models/Sensor.js";
import Irrigation from "../models/Irrigation.js";
import { getPumpState } from "./pumpController.js";
// ---------------- ESTADOS ----------------
let pumpState = "OFF";
let temperatureThreshold = 25; // 🔥 umbral inicial

// ---------------- LÓGICA ----------------
const shouldIrrigate = (temperature) => {
  return temperature >= temperatureThreshold;
};

// ---------------- ESP32 ----------------
export const addSensorDevice = async (req, res) => {
  try {
    const { temperature, humidity, deviceId } = req.body;

    if (temperature === undefined) {
      return res.status(400).json({
        message: "La temperatura es requerida"
      });
    }

    // Guardar datos
    const newSensor = new Sensor({
      temperature,
      humidity,
      device: deviceId || "esp32-01"
    });

    await newSensor.save();

    // 🔥 Decidir riego con umbral dinámico
    const irrigate = shouldIrrigate(temperature);

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
      irrigationActivated: irrigate
    });

  } catch (error) {
    res.status(500).json({
      message: "Error en sensor device",
      error: error.message
    });
  }
};

// ---------------- OBTENER DATOS ----------------
export const getLatestSensor = async (req, res) => {
  try {
    const sensor = await Sensor.findOne().sort({ createdAt: -1 });

    res.json({
      temperature: sensor?.temperature || 0,
      humidity: sensor?.humidity || 0,
      pumpActive: getPumpState() === "ON",
      threshold: temperatureThreshold
    });

  } catch (error) {
    res.status(500).json({
      message: "Error obteniendo datos",
      error: error.message
    });
  }
};

// ---------------- ACTIVAR BOMBA ----------------
export const activatePumpManual = async (req, res) => {
  try {
    pumpState = "ON";

    await new Irrigation({
      duration: 10,
      trigger: "manual"
    }).save();

    res.json({
      message: "Bomba activada manualmente",
      pumpActive: true
    });

  } catch (error) {
    res.status(500).json({
      message: "Error activando bomba",
      error: error.message
    });
  }
};

// ---------------- CAMBIAR UMBRAL ----------------
export const updateThreshold = async (req, res) => {
  try {
    const { threshold } = req.body;

    if (threshold === undefined) {
      return res.status(400).json({
        message: "El umbral es requerido"
      });
    }

    temperatureThreshold = threshold;

    res.json({
      message: "Umbral actualizado",
      threshold: temperatureThreshold
    });

  } catch (error) {
    res.status(500).json({
      message: "Error actualizando umbral",
      error: error.message
    });
  }
};
// ---------------- HISTORIAL COMPLETO ----------------
export const getAllSensors = async (req, res) => {
  try {
    const sensores = await Sensor.find().sort({ date: -1 }).limit(100);
    res.json(sensores);
  } catch (error) {
    res.status(500).json({
      message: "Error obteniendo historial",
      error: error.message
    });
  }
};