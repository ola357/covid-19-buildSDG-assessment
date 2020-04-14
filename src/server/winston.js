import appRoot from 'app-root-path';
import winston from 'winston';
const options = {
  file: {
    level: 'info',
    filename: `${appRoot}/app.log`,
    handleExceptions: true,
    json: false,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true
  }
};
const logger = new winston.createLogger({
  transports: [
    new winston.transports.File(options.file),
    new winston.transports.Console(options.console)
  ],
  exitOnError: false // do not exit on handled exceptions
});

logger.stream = {
  write: (message, encoding) => {
    logger.info(message);
  }
};

export default logger;
