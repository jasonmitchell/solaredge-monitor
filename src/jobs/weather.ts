import cron from 'node-cron';
import { Config } from '../config';
import { save } from '../persistence/weather';
import { getCurrentWeather } from '../openweathermap-client';

export const start = async ({weatherApiKey, lat, long}: Config) => {
  console.log('Starting energy overview monitor');

  cron.schedule('0 * * * *', async () => {
    const currentWeather = await getCurrentWeather(weatherApiKey, lat, long);
    if (!currentWeather) {
      console.warn('Failed to get current weather')
      return;
    }

    save(currentWeather);
  }, {
    runOnInit: true
  });
}
