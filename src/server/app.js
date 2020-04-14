import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
//import routes
import routes from './routes';

const app = express();


app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(morgan('dev'));
app.use('/api/v1/on-covid-19', routes);


const port = process.env.PORT || 5000;

const server = app.listen(port, () => console.log(`Listening on port ${port}...`));
export default server;