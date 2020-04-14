import express from 'express';
import xml from 'xml2js';
import covid19ImpactEstimator from '../estimator'
const router = express.Router();
const builder = new xml.Builder();


router.get('/', (req, res) => {
   // console.log(res.baseUrl);
    res.send({
        message: "andela build for SDGs challenge"
    });

});
router.post('/', (req, res) => {
    let result;
    try {
        result = covid19ImpactEstimator(req.body);
    } catch (error) {
        res.send({ errormessage: error })
    }

    res.send(result);
});
router.post('/json', (req, res) => {
    let result;
    try {
        result = covid19ImpactEstimator(req.body);
    } catch (error) {
        res.send({ errormessage: error })
    }

    res.send(result);
});
router.post('/xml', (req, res) => {
    let result;
    try {
        result = covid19ImpactEstimator(req.body);
    } catch (error) {
        res.send({ errormessage: error })
    }
    res.set('Content-Type', 'text/xml');
    res.send(builder.buildObject(result));
});
export default router;