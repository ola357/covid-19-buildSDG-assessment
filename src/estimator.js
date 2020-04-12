const output = {
  data: {}, // the input data you got
  impact: {}, // your best case estimation
  severeImpact: {} // your severe case estimation
};
const calculateFactor =(days)=>{
    
}
const covid19ImpactEstimator = (input) => {
  output.impact.currentlyInfected = input.reportedCases * 10;
  output.severeImpact.currentlyInfected = input.reportedCases * 50;
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
