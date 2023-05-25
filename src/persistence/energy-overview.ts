import { EnergyOverview } from '../solaredge-client';

type Record = {
  timestamp: string;
  energyOverview: EnergyOverview;
}

let current: Record | undefined = undefined;

const latestRecord = (): Record | undefined => {
  if (!current) {
    return;
  }

  return current;
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

export const save = (energyOverview: EnergyOverview) => {
  const timestamp = new Date();

  current = {
    timestamp: timestamp.toISOString(),
    energyOverview: energyOverview
  };
}
