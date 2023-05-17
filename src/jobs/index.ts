import { Config } from '../config';
import * as energyOverview from './energy-overview';

export const start = async (config: Config) => {
  await energyOverview.start(config)
}
