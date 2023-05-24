import cron from 'node-cron';
import { latestForCurrentDay as latestOverview } from '../persistence/energy-overview';
import { latest as currentWeather } from '../persistence/weather';
import {
  clouds,
  currentPower,
  lastDay,
  lastMonth,
  lastYear,
  lifeTime,
  temperature,
  uvIndex,
  visibility
} from '../metrics';

export const start = () => {
  console.log('Starting set metrics job');

  cron.schedule('*/15 * * * * *', () => {
    const overview = latestOverview();
    if (!overview) {
      return;
    }

    lastDay.set(overview.lastDayData.energy);
    lastMonth.set(overview.lastMonthData.energy);
    lastYear.set(overview.lastYearData.energy);
    lifeTime.set(overview.lifeTimeData.energy);
    currentPower.set(overview.currentPower.power);
  });

  cron.schedule('*/15 * * * * *', () => {
    const weather = currentWeather();
    if (!weather) {
      return;
    }

    temperature.set(weather.temp);
    uvIndex.set(weather.uvi);
    clouds.set(weather.clouds);
    visibility.set(weather.visibility);
  });
};
