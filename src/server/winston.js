import appRoot from 'app-root-path';
import { createLogger, transports } from 'winston';

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
const logger = createLogger({
  transports: [
    new transports.File(options.file),
    new transports.Console(options.console)
  ],
  exitOnError: false // do not exit on handled exceptions
});

logger.stream = {
  write: (message) => {
    logger.info(message);
  }
};

export default logger;
