import { Config } from '../config';
import * as energyOverview from './energy-overview';
import * as setMetrics from './set-metrics';
import * as dailyReset from './daily-reset';

export const start = async (config: Config) => {
  await energyOverview.start(config)
  setMetrics.start();
  dailyReset.start();
}
