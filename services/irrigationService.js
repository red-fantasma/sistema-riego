import Settings from "../models/Settings.js";
import { getWeather } from "./weatherService.js";

export const shouldIrrigate = async (temperature) => {
  const settings = await Settings.findOne();
  const weather = await getWeather();

  if (!settings) return false;

  if (
    temperature >= settings.minTemp &&
    weather.rainProbability < 50
  ) {
    return true;
  }

  return false;
};