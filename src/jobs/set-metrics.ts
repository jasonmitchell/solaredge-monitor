import cron from 'node-cron';
import { latest } from '../persistence/energy-overview';
import { currentPower, lastDay, lastMonth, lastYear, lifeTime } from '../metrics';

export const start = () => {
  console.log('Starting set metrics job');

  cron.schedule('*/15 * * * * *', () => {
    const latestOverview = latest();
    if (!latestOverview) {
      return;
    }

    lastDay.set(latestOverview.lastDayData.energy);
    lastMonth.set(latestOverview.lastMonthData.energy);
    lastYear.set(latestOverview.lastYearData.energy);
    lifeTime.set(latestOverview.lifeTimeData.energy);
    currentPower.set(latestOverview.currentPower.power);
  });
};
