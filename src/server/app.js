import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import log from 'winston';
import routes from './routes';
import winston from './winston';

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('common', { stream: winston.stream }));

app.use('/api/v1/on-covid-19', routes);

app.get('/', (req, res) => {
  res.send('andela build sdg challenge');
});
const port = process.env.PORT || 5000;

const server = app.listen(port, () => log.info(`Listening on port ${port}...`));
export default server;
