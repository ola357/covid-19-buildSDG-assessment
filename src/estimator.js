const convertDurationToDays = (periodType, timeToElapse) => {
  if (periodType.toLowerCase() === 'days') {
    return timeToElapse;
  }
  if (periodType.toLowerCase() === 'weeks') {
    return timeToElapse * 7;
  }
  if (periodType.toLowerCase() === 'months') {
    return timeToElapse * 30;
  }
  return -1;
};
const calculateFactor = (days) => {
  if (days < 0) {
    return -1;
  }
  return Math.trunc(days / 3);
};

const evaluateSevereCasesByRequestedTime = (infectionsByRequestedTime) 
  => Math.trunc(infectionsByRequestedTime * 0.15);

const hospitalBedsByRequestedTime = (
  totalHospitalBeds,
  severeCasesByRequestedTime
) => Math.trunc(0.35 * totalHospitalBeds) - severeCasesByRequestedTime;

const dollarsInFlight = (
  infectionsByRequestedTime,
  avgDailyIncomePopulation,
  avgDailyIncomeInUSD,
  periodType,
  timeToElapse
) => {
  const result = (infectionsByRequestedTime
      * avgDailyIncomePopulation
      * avgDailyIncomeInUSD)
    / convertDurationToDays(periodType, timeToElapse);
  return Math.trunc(result);
};
const covid19ImpactEstimator = (input) => {
  const output = { data: {}, impact: {}, severeImpact: {} };
  const { impact, severeImpact } = output;
  const {
    region,
    periodType,
    timeToElapse,
    reportedCases,
    totalHospitalBeds
  } = input;
  const { avgDailyIncomePopulation, avgDailyIncomeInUSD } = region;
  // challenge 1
  impact.currentlyInfected = reportedCases * 10;
  impact.infectionsByRequestedTime = impact.currentlyInfected
    * 2 ** calculateFactor(convertDurationToDays(periodType, timeToElapse));
  // challenge 2
  impact.severeCasesByRequestedTime = evaluateSevereCasesByRequestedTime(
    impact.infectionsByRequestedTime
  );
  impact.hospitalBedsByRequestedTime = hospitalBedsByRequestedTime(
    totalHospitalBeds,
    impact.severeCasesByRequestedTime
  );
  // challenge 3
  impact.casesForICUByRequestedTime = Math.trunc(
    0.05 * impact.infectionsByRequestedTime
  );
  impact.casesForVentilatorsByRequestedTime = Math.trunc(
    0.02 * impact.infectionsByRequestedTime
  );
  impact.dollarsInFlight = dollarsInFlight(
    impact.infectionsByRequestedTime,
    avgDailyIncomePopulation,
    avgDailyIncomeInUSD,
    periodType,
    timeToElapse
  );
  // challenge 1
  severeImpact.currentlyInfected = reportedCases * 50;
  severeImpact.infectionsByRequestedTime = severeImpact.currentlyInfected
    * 2 ** calculateFactor(convertDurationToDays(periodType, timeToElapse));
  severeImpact.severeCasesByRequestedTime = evaluateSevereCasesByRequestedTime(
    severeImpact.infectionsByRequestedTime
  );
  severeImpact.hospitalBedsByRequestedTime = hospitalBedsByRequestedTime(
    totalHospitalBeds,
    severeImpact.severeCasesByRequestedTime
  );
  // challenge 3
  severeImpact.casesForICUByRequestedTime = Math.trunc(
    0.05 * severeImpact.infectionsByRequestedTime
  );
  severeImpact.casesForVentilatorsByRequestedTime = Math.trunc(
    0.02 * severeImpact.infectionsByRequestedTime
  );
  severeImpact.dollarsInFlight = dollarsInFlight(
    severeImpact.infectionsByRequestedTime,
    avgDailyIncomePopulation,
    avgDailyIncomeInUSD,
    periodType,
    timeToElapse
  );
  output.data = input;

  return output;
};

export default covid19ImpactEstimator;
