import { Gauge } from 'prom-client';

export const lastDay = new Gauge({ name: 'solar_last_day_energy', help: 'Total solar energy generated in the last day' });
export const lastMonth = new Gauge({ name: 'solar_last_month_energy', help: 'Total solar energy generated in the last month' });
export const lastYear = new Gauge({ name: 'solar_last_year_energy', help: 'Total solar energy generated in the last year' });
export const lifeTime = new Gauge({ name: 'solar_life_time_energy', help: 'Total solar energy generated' });
export const currentPower = new Gauge({ name: 'solar_current_power', help: 'Current solar power' });
