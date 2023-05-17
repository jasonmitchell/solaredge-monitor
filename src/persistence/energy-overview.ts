import { EnergyOverview } from '../solaredge-client';
import fs from 'fs';

type Record = {
  timestamp: string;
  energyOverview: EnergyOverview;
}

const recordsForCurrentDay: Record[] = [];

export const save = (dataDir: string, energyOverview: EnergyOverview) => {
  const timestamp = new Date();
  const date = timestamp.toISOString().split('T')[0];

  const record = {
    timestamp: timestamp.toISOString(),
    energyOverview: energyOverview
  };

  const fileName = `${dataDir}/${date}`;
  const json = JSON.stringify(record);

  fs.appendFileSync(fileName, `${json}\n`);

  const latestRecord = recordsForCurrentDay[recordsForCurrentDay.length - 1];

  if (date !== latestRecord.timestamp.split('T')[0]) {
    // clear in memory records if day has changed
    recordsForCurrentDay.length = 0;
  }

  recordsForCurrentDay.push(record);
}
