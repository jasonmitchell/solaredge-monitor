type Energy = {
  energy: number;
}

type EnergyOverview = {
  lastDayData: Energy;
  lastMonthData: Energy;
  lastYearData: Energy;
  lifeTimeData: Energy;
  currentPower: {
    power: number;
  };
};

export const getEnergyOverview = async (apiKey: string, siteId: string): Promise<EnergyOverview> => {
  const response = await fetch(`https://monitoringapi.solaredge.com/site/${siteId}/overview?api_key=${apiKey}`);
  const data = await response.json();

  return data.overview;
};
