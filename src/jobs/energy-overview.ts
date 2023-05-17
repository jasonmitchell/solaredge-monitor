import cron from 'node-cron';
import { Config } from '../config';
import { getEnergyOverview } from '../solaredge-client';
import { save } from '../persistence/energy-overview';

export const start = async ({apiKey, siteId, dataDir}: Config) => {
  console.log('Starting energy overview monitor');

  cron.schedule('*/2 * * * *', async () => {
    const overview = await getEnergyOverview(apiKey, siteId);
    if (!overview) {
      console.warn('Failed to get energy overview')
      return;
    }

    save(dataDir, overview);
  }, {
    runOnInit: true
  });
}
