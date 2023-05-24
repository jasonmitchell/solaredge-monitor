import { Config } from '../config';
import * as energyOverview from './energy-overview';
import * as weather from './weather';
import * as setMetrics from './set-metrics';

export const start = async (config: Config) => {
  await energyOverview.start(config);
  await weather.start(config);
  setMetrics.start();
}
