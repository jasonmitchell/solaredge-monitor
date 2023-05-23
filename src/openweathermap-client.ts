export type Weather = {
  sunrise: number;
  sunset: number;
  temp: number;
  feels_like: number;
  uvi: number;
  clouds: number;
  visibility: number;
};

export const getCurrentWeather = async (apiKey: string, lat: string, long: string): Promise<Weather | undefined> => {
  const apiTimeout = 30_000;
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), apiTimeout);

  try {
    const response = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${long}&exclude=minutely,hourly,daily&units=metric&appid=${apiKey}`, {
      signal: controller.signal
    });

    clearTimeout(id);

    const data = await response.json();
    return data.current;
  } catch (err) {
    console.error(err)
    return;
  }
};
