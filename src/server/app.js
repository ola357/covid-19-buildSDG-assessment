import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';
import approot from 'app-root-path';
import routes from './routes';
import winston from './winston';

const app = express();
const format = ':method\t\t:url\t\t:status\t\t:response-time[0]ms\r';
const logStream = fs.createWriteStream(
  path.join(`${approot}`, 'app.log'),
  {
    flags: 'a'
  }
);

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan(format));
app.use(morgan(format, { stream: logStream }));

app.use('/api/v1/on-covid-19', routes);

app.get('/', (req, res) => {
  res.send('andela build sdg challenge');
});
const port = process.env.PORT || 5000;

const server = app.listen(port, () => winston.info(`Listening on port ${port}...`));
export default server;
