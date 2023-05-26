import { Gauge } from 'prom-client';
import { latestForCurrentDay } from '../persistence/energy-overview';

export const lastDay = new Gauge({
  name: 'solar_last_day_energy',
  help: 'Total solar energy generated in the last day',
  collect() {
    const latest = latestForCurrentDay();
    const value = latest.lastDayData.energy;
    this.set(value);
  }
});

export const lastMonth = new Gauge({
  name: 'solar_last_month_energy',
  help: 'Total solar energy generated in the last month',
  collect() {
    const latest = latestForCurrentDay();
    const value = latest.lastMonthData.energy;
    this.set(value);
  }
});

export const lastYear = new Gauge({
  name: 'solar_last_year_energy',
  help: 'Total solar energy generated in the last year',
  collect() {
    const latest = latestForCurrentDay();
    const value = latest.lastYearData.energy;
    this.set(value);
  }
});

export const lifeTime = new Gauge({
  name: 'solar_life_time_energy',
  help: 'Total solar energy generated',
  collect() {
    const latest = latestForCurrentDay();
    const value = latest.lifeTimeData.energy;
    this.set(value);
  }
});

export const currentPower = new Gauge({
  name: 'solar_current_power',
  help: 'Current solar power',
  collect() {
    const latest = latestForCurrentDay();
    const value = latest.currentPower.power;
    this.set(value);
  }
});
