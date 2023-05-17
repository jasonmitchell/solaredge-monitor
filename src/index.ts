import os from 'os';
import fs from 'fs';
import client from 'prom-client';
import { createMetricsServer } from './server';
import * as jobs from './jobs';
import { getEnergyOverview } from './solaredge-client';
import { currentPower, lastDay, lastMonth, lastYear, lifeTime } from './metrics';

const port = process.env.PORT || 9090;
const fetchDataInterval = 1000 * 60 * 2; // 2 minutes
const config = {
  apiKey: process.env.API_KEY as string,
  siteId: process.env.SITE_ID as string,
  dataDir: './data'
};

if (!fs.existsSync(config.dataDir)) {
  fs.mkdirSync(config.dataDir);
}

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
  const overview = await getEnergyOverview(config.apiKey, config.siteId);
  if (!overview) {
    return;
  }

  lastDay.set(overview.lastDayData.energy);
  lastMonth.set(overview.lastMonthData.energy);
  lastYear.set(overview.lastYearData.energy);
  lifeTime.set(overview.lifeTimeData.energy);
  currentPower.set(overview.currentPower.power);
}

const metricsServer = createMetricsServer(registry);

metricsServer.listen(port, async () => {
  console.log(`Server running on port ${port}.`);

  await jobs.start(config);
  await collectMetrics(); // collect some metrics immediately on start
  setInterval(collectMetrics, fetchDataInterval);
});
