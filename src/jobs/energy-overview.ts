import cron from 'node-cron';
import { Config } from '../config';
import { getEnergyOverview } from '../solaredge-client';
import { save } from '../persistence/energy-overview';
import { currentPower, lastDay, lastMonth, lastYear, lifeTime } from '../metrics';

export const start = async ({apiKey, siteId}: Config) => {
  console.log('Starting energy overview monitor');

  cron.schedule('*/2 * * * *', async () => {
    const overview = await getEnergyOverview(apiKey, siteId);
    if (!overview) {
      console.warn('Failed to get energy overview')
      return;
    }

    save(overview);

    lastDay.set(overview.lastDayData.energy);
    lastMonth.set(overview.lastMonthData.energy);
    lastYear.set(overview.lastYearData.energy);
    lifeTime.set(overview.lifeTimeData.energy);
    currentPower.set(overview.currentPower.power);
  }, {
    runOnInit: true
  });
}
