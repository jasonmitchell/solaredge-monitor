import { Gauge, Registry } from 'prom-client';

export const register = (registry: Registry) => {
  registry.registerMetric(temperature);
  registry.registerMetric(uvIndex);
  registry.registerMetric(clouds);
  registry.registerMetric(visibility);
  registry.registerMetric(lastDay);
  registry.registerMetric(lastMonth);
  registry.registerMetric(lastYear);
  registry.registerMetric(lifeTime);
  registry.registerMetric(currentPower);
}

// Weather
export const temperature = new Gauge({ name: 'weather_temperature', help: 'Temperature in celsius' });
export const uvIndex = new Gauge({ name: 'weather_uvi', help: 'UV index' });
export const clouds = new Gauge({ name: 'weather_clouds', help: 'Cloud cover percentage' });
export const visibility = new Gauge({ name: 'weather_visibility', help: 'Average visibility in metres' });

// Solar
export const lastDay = new Gauge({ name: 'solar_last_day_energy', help: 'Total solar energy generated in the last day' });
export const lastMonth = new Gauge({ name: 'solar_last_month_energy', help: 'Total solar energy generated in the last month' });
export const lastYear = new Gauge({ name: 'solar_last_year_energy', help: 'Total solar energy generated in the last year' });
export const lifeTime = new Gauge({ name: 'solar_life_time_energy', help: 'Total solar energy generated' });
export const currentPower = new Gauge({ name: 'solar_current_power', help: 'Current solar power' });
