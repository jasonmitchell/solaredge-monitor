import os from 'os';
import client from 'prom-client';
import { createMetricsServer } from './server';
import * as jobs from './jobs';
import { currentPower, lastDay, lastMonth, lastYear, lifeTime } from './metrics';

const port = process.env.PORT || 9090;
const config = {
  apiKey: process.env.API_KEY as string,
  siteId: process.env.SITE_ID as string,
};

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

const metricsServer = createMetricsServer(registry);

metricsServer.listen(port, async () => {
  console.log(`Server running on port ${port}.`);
  await jobs.start(config);
});
