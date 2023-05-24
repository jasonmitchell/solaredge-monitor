import { EnergyOverview } from '../solaredge-client';

type Record = {
  timestamp: string;
  energyOverview: EnergyOverview;
}

const records: Record[] = [];

const latestRecord = (): Record | undefined => {
  if (records.length === 0) {
    return;
  }

  return records[records.length - 1];
};

export const latestForCurrentDay = (): EnergyOverview => {
  const latest = latestRecord();
  const currentDate = new Date();

  if (!latest || !datesAreSameDay(currentDate, new Date(latest.timestamp))) {
    return {
      lastDayData: { energy: 0 },
      lastMonthData: { energy: 0 },
      lastYearData: { energy: 0 },
      lifeTimeData: { energy: 0 },
      currentPower: { power: 0 }
    }
  }

  return latest.energyOverview
}

const datesAreSameDay = (a: Date, b: Date) => {
  return a.getFullYear() === b.getFullYear() &&
         a.getMonth() === b.getMonth() &&
         a.getDate() === b.getDate();
}

export const reset = () => {
  records.length = 0;
};

export const save = (energyOverview: EnergyOverview) => {
  const timestamp = new Date();
  const date = timestamp.toISOString().split('T')[0];

  const record = {
    timestamp: timestamp.toISOString(),
    energyOverview: energyOverview
  };

  if (records.length > 0) {
    const latestRecord = records[records.length - 1];
    if (date !== latestRecord.timestamp.split('T')[0]) {
      // clear in memory records if day has changed
      records.length = 0;
    }
  }

  records.push(record);
}
