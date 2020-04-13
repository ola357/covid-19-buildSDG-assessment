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
console.log(calculateFactor(10));
console.log(calculateFactor(convertDurationToDays('weeks', 4)));

const evaluateSevereCasesByRequestedTime = (infectionsByRequestedTime) => {
  return Math.trunc(infectionsByRequestedTime * 0.15);
};

const covid19ImpactEstimator = (input) => {
  // let {data, impact,severeImpact} = output;
  let output = { data: {}, impact: {}, severeImpact: {} };
  let { data, impact, severeImpact } = output;
  let {
    region,
    periodType,
    timeToElapse,
    reportedCases,
    population,
    totalHospitalBeds
  } = input;

  impact.currentlyInfected = reportedCases * 10;
  impact.infectionsByRequestedTime =
    impact.currentlyInfected *
    2 ** calculateFactor(convertDurationToDays(periodType, timeToElapse));
  impact.severeCasesByRequestedTime = evaluateSevereCasesByRequestedTime(
    impact.infectionsByRequestedTime
  );
  severeImpact.currentlyInfected = reportedCases * 50;
  severeImpact.infectionsByRequestedTime =
    severeImpact.currentlyInfected *
    2 ** calculateFactor(convertDurationToDays(periodType, timeToElapse));
  severeImpact.severeCasesByRequestedTime = evaluateSevereCasesByRequestedTime(
    severeImpact.infectionsByRequestedTime
  );
  output.data = input;
  console.log(output);
  return output;
};

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
covid19ImpactEstimator(data);

export default covid19ImpactEstimator;
