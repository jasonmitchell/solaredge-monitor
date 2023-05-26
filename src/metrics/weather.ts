import { Gauge } from 'prom-client';
import { latest as currentWeather } from '../persistence/weather';

export const temperature = new Gauge({
  name: 'weather_temperature',
  help: 'Temperature in celsius',
  collect() {
    const weather = currentWeather();
    if (!weather) {
      return;
    }

    this.set(weather.temp);
  }
});

export const uvIndex = new Gauge({
  name: 'weather_uvi',
  help: 'UV index' ,
  collect() {
    const weather = currentWeather();
    if (!weather) {
      return;
    }

    this.set(weather.uvi);
  }
});

export const clouds = new Gauge({
  name: 'weather_clouds',
  help: 'Cloud cover percentage',
  collect() {
    const weather = currentWeather();
    if (!weather) {
      return;
    }

    this.set(weather.clouds);
  }
});

export const visibility = new Gauge({
  name: 'weather_visibility',
  help: 'Average visibility in metres',
  collect() {
    const weather = currentWeather();
    if (!weather) {
      return;
    }

    this.set(weather.visibility);
  }
});
