import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
//import fs from 'fs';
//import path from 'path';
//import routes
import routes from './routes';
import winston from './winston';

const app = express();
// create a write stream (in append mode)
//const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.txt'), { flags: 'a' })

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('common',{stream: winston.stream}));
//app.use(morgan('tiny', { stream: accessLogStream }));

//app.use(morgan('dev', { stream: accessLogStream }));

app.use('/api/v1/on-covid-19', routes);
//app.use(morgan('dev'));
//app.use(morgan('combined'
//, { stream: winston.stream }
//));
/* const logger = winston.createLogger({
    transports: [
        new winston.transports.File({
            filename: 'combined.log',
            level: 'info'
        }),
        new winston.transports.File({
            filename: 'errors.log',
            level: 'http'
        })
    ]
}); */

app.get('/',(req, res)=>{
    res.send("andela build sdg challenge");
});
const port = process.env.PORT || 5000;

const server = app.listen(port, () => console.log(`Listening on port ${port}...`));
export default server;