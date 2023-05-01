import http from 'http';
import url from 'url';
import { Registry } from 'prom-client';

export const createMetricsServer = (registry: Registry) => {
  return http.createServer(async (req, res) => {
    const route = url.parse(req.url!).pathname;
    if (route === '/metrics') {
      const metrics = await registry.metrics();

      res.setHeader('Content-Type', registry.contentType);
      res.end(metrics);
    }
  });
};
