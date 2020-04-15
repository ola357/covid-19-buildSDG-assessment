import express from 'express';
import xml from 'xml';
import fs from 'fs';
import appRoot from 'app-root-path';
import covid19ImpactEstimator from '../estimator';

const router = express.Router();

router.get('/', (req, res) => {
  res.send({
    message: 'andela build for SDGs challenge'
  });
});
router.post('/', (req, res) => {
  let result;
  try {
    result = covid19ImpactEstimator(req.body);
  } catch (error) {
    res.send({ errormessage: error });
  }

  res.send(result);
});
router.post('/json', (req, res) => {
  let result;
  try {
    result = covid19ImpactEstimator(req.body);
  } catch (error) {
    res.send({ errormessage: error });
  }

  res.send(result);
});
router.post('/xml', (req, res) => {
  let result;
  try {
    result = covid19ImpactEstimator(req.body);
  } catch (error) {
    res.send({ errormessage: error });
  }
  res.set('Content-Type', 'application/xml');
  res.type('xml');
  res.send(xml(result));
});
router.get('/logs', (req, res) => {
  let result;
  try {
    result = fs.readFileSync(`${appRoot}/app.log`, 'utf8');
  } catch (e) {
    res.status(401).send({ error: e });
  }
  res.set('Content-Type', 'text/plain');
  res.type('text/plain');
  res.send(result);
});
export default router;
