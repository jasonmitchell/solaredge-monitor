import cron from 'node-cron';
import { reset } from '../persistence/energy-overview';

export const start = () => {
  console.log('Starting daily reset job');

  cron.schedule('15 23 * * *', async () => {
    console.log('Resetting daily metrics')
    reset();
  });
}
