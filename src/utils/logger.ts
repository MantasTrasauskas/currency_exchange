import { createLogger, transports, format } from 'winston';
const logger = createLogger({
  transports: [new transports.Console()],
  format: format.combine(
    format.colorize(),
    format.timestamp(),
    format.splat(),
    format.json(),
    format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] ${level}: ${message}`;
    }),
  ),
});

logger.info('Logger initialized!');
export default logger;
