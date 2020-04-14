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

const evaluateSevereCasesByRequestedTime = (infectionsByRequestedTime) => {
  return Math.trunc(infectionsByRequestedTime * 0.15);
};

const hospitalBedsByRequestedTime = (
  totalHospitalBeds,
  severeCasesByRequestedTime
) => {
  return Math.trunc(0.35 * totalHospitalBeds) - severeCasesByRequestedTime;
};

const dollarsInFlight = (
  infectionsByRequestedTime,
  avgDailyIncomePopulation,
  avgDailyIncomeInUSD,
  periodType,
  timeToElapse
) => {
  const result =
    (infectionsByRequestedTime *
      avgDailyIncomePopulation *
      avgDailyIncomeInUSD) /
    convertDurationToDays(periodType, timeToElapse);
  return Math.trunc(result);
};
const covid19ImpactEstimator = (input) => {
  let output = { data: {}, impact: {}, severeImpact: {} };
  let { impact, severeImpact } = output;
  let {
    region,
    periodType,
    timeToElapse,
    reportedCases,
    population,
    totalHospitalBeds
  } = input;
  const { avgDailyIncomePopulation, avgDailyIncomeInUSD } = region;
  // challenge 1
  impact.currentlyInfected = reportedCases * 10;
  impact.infectionsByRequestedTime =
    impact.currentlyInfected *
    2 ** calculateFactor(convertDurationToDays(periodType, timeToElapse));
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
  severeImpact.infectionsByRequestedTime =
    severeImpact.currentlyInfected *
    2 ** calculateFactor(convertDurationToDays(periodType, timeToElapse));
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
  //console.log(output);

  return output;
};
/* 
const data = {
  region: {
    name: 'Africa',
    avgAge: 19.7,
    avgDailyIncomeInUSD: 5,
    avgDailyIncomePopulation: 0.71
  },
  periodType: 'days',
  timeToElapse: 58,
  reportedCases: 674,
  population: 66622705,
  totalHospitalBeds: 1380614
};
const sample = {
  region: {
    name: 'Africa',
    avgAge: 19.7,
    avgDailyIncomeInUSD: 4,
    avgDailyIncomePopulation: 0.73
  },
  periodType: 'days',
  timeToElapse: 38,
  reportedCases: 2747,
  population: 92931687,
  totalHospitalBeds: 678874
};
 */
/* covid19ImpactEstimator(data);
console.log('##############################');
console.log(covid19ImpactEstimator(sample));
console.log('##############################'); */
export default covid19ImpactEstimator;
