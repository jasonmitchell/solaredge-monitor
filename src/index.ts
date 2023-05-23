import os from 'os';
import client from 'prom-client';
import { createMetricsServer } from './server';
import * as jobs from './jobs';
import { register } from './metrics';

const port = process.env.PORT || 9090;
const config = {
  apiKey: process.env.API_KEY as string,
  siteId: process.env.SITE_ID as string,
  weatherApiKey: process.env.WEATHER_API_KEY as string,
  lat: process.env.LAT as string,
  long: process.env.LONG as string
};

const registry = new client.Registry();
registry.setDefaultLabels({
  app: 'solaredge-monitor',
  hostname: os.hostname()
});

client.collectDefaultMetrics({ register: registry });
register(registry);

const metricsServer = createMetricsServer(registry);

metricsServer.listen(port, async () => {
  console.log(`Server running on port ${port}.`);
  await jobs.start(config);
});
