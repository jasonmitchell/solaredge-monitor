import cron from 'node-cron';
import { Config } from '../config';
import { getEnergyOverview } from '../solaredge-client';
import { reset, save } from '../persistence/energy-overview';

export const start = async ({apiKey, siteId}: Config) => {
  console.log('Starting energy overview monitor');

  cron.schedule('*/2 2-23 * * *', async () => {
    const overview = await getEnergyOverview(apiKey, siteId);
    if (!overview) {
      console.warn('Failed to get energy overview')
      return;
    }

    save(overview);
  }, {
    runOnInit: true
  });

  cron.schedule('55 23 * * *', async () => {
    console.log('Resetting daily metrics')
    reset();
  });
}
