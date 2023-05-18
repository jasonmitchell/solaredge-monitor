import { EnergyOverview } from '../solaredge-client';

type Record = {
  timestamp: string;
  energyOverview: EnergyOverview;
}

const recordsForCurrentDay: Record[] = [];

export const latest = (): EnergyOverview | undefined => {
  console.log('get latest')
  if (recordsForCurrentDay.length === 0) {
    return;
  }

  const latestRecord = recordsForCurrentDay[recordsForCurrentDay.length - 1];
  return latestRecord.energyOverview;
};

export const save = (energyOverview: EnergyOverview) => {
  const timestamp = new Date();
  const date = timestamp.toISOString().split('T')[0];

  const record = {
    timestamp: timestamp.toISOString(),
    energyOverview: energyOverview
  };

  if (recordsForCurrentDay.length > 0) {
    const latestRecord = recordsForCurrentDay[recordsForCurrentDay.length - 1];
    if (date !== latestRecord.timestamp.split('T')[0]) {
      // clear in memory records if day has changed
      recordsForCurrentDay.length = 0;
    }
  }

  recordsForCurrentDay.push(record);
}
