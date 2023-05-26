import { Registry } from 'prom-client';
import { currentPower, lastDay, lastMonth, lastYear, lifeTime } from './solar';
import { clouds, temperature, uvIndex, visibility } from './weather';

export const register = (registry: Registry) => {
  registry.registerMetric(temperature);
  registry.registerMetric(uvIndex);
  registry.registerMetric(clouds);
  registry.registerMetric(visibility);
  registry.registerMetric(lastDay);
  registry.registerMetric(lastMonth);
  registry.registerMetric(lastYear);
  registry.registerMetric(lifeTime);
  registry.registerMetric(currentPower);
};
