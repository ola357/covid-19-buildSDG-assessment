import express from 'express';
import covid19ImpactEstimator  from '../estimator'
const router = express.Router();
router.get('/', (req, res) => {
   // res.send({message:"hello olaoluwa"});
   res.send({
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
  });
});
router.post('/', (req, res) => {
    let result;
    try {
        result = covid19ImpactEstimator(req.body);
    } catch (error) {
        res.send({errormessage: error})
    }
    
    res.send(result);
});
router.post('/json', (req, res) => {
    let result;
    try {
        result = covid19ImpactEstimator(req.body);
    } catch (error) {
        res.send({errormessage: error})
    }
    
    res.send(result);
});
export default router;