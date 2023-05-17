type Energy = {
  energy: number;
}

export type EnergyOverview = {
  lastDayData: Energy;
  lastMonthData: Energy;
  lastYearData: Energy;
  lifeTimeData: Energy;
  currentPower: {
    power: number;
  };
};

export const getEnergyOverview = async (apiKey: string, siteId: string): Promise<EnergyOverview | undefined> => {
  const apiTimeout = 30_000;
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), apiTimeout);

  try {
    const response = await fetch(`https://monitoringapi.solaredge.com/site/${siteId}/overview?api_key=${apiKey}`, {
      signal: controller.signal
    });

    clearTimeout(id);

    const data = await response.json();
    return data.overview;
  } catch (err) {
    console.error(err)
    return;
  }
};
