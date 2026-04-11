export const addSensorDevice = async (req, res) => {
  try {
    const { temperature } = req.body;

    // Validación
    if (temperature === undefined) {
      return res.status(400).json({
        message: "La temperatura es requerida"
      });
    }

    // Guardar en MongoDB
    const newSensor = new Sensor({
      temperature,
      device: "ESP32"
    });

    await newSensor.save();

    // Lógica automática
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

    // RESPUESTA CLAVE PARA ESP32
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