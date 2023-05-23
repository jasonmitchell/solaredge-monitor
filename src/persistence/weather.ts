import { Weather } from '../openweathermap-client';

type Record = {
  timestamp: string;
  weather: Weather;
}

let current: Record | undefined = undefined;

export const latest = (): Weather | undefined => {
  if (!current) {
    return;
  }

  return current.weather;
};

export const save = (weather: Weather) => {
  const timestamp = new Date();

  current = {
    timestamp: timestamp.toISOString(),
    weather: weather
  };
}
