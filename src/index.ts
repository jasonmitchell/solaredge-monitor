import os from 'os';
import client from 'prom-client';
import { createMetricsServer } from './server';
import { getEnergyOverview } from './solaredge-client';
import { currentPower, lastDay, lastMonth, lastYear, lifeTime } from './metrics';

const port = process.env.PORT || 9090;
const fetchDataInterval = 1000 * 60 * 5; // 5 minutes
const apiKey = process.env.API_KEY as string;
const siteId = process.env.SITE_ID as string;

const registry = new client.Registry();
registry.setDefaultLabels({
  app: 'solaredge-monitor',
  hostname: os.hostname()
});

client.collectDefaultMetrics({ register: registry });

registry.registerMetric(lastDay);
registry.registerMetric(lastMonth);
registry.registerMetric(lastYear);
registry.registerMetric(lifeTime);
registry.registerMetric(currentPower);

const collectMetrics = async (): Promise<void> => {
  const overview = await getEnergyOverview(apiKey, siteId);

  lastDay.set(overview.lastDayData.energy);
  lastMonth.set(overview.lastMonthData.energy);
  lastYear.set(overview.lastYearData.energy);
  lifeTime.set(overview.lifeTimeData.energy);
  currentPower.set(overview.currentPower.power);
}

const metricsServer = createMetricsServer(registry);

metricsServer.listen(port, async () => {
  console.log(`Server running on port ${port}.`);

  await collectMetrics(); // collect some metrics immediately on start
  setInterval(collectMetrics, fetchDataInterval);
});
