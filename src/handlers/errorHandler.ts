import { ServerHttp2Stream } from 'http2';
import logger from '../utils/logger';

export const errorHandler = (
  message: string,
  stream: ServerHttp2Stream | null = null,
) => {
  const stack = new Error().stack;
  logger.error(`${message}: %o`, stack);
  if (stream != null) {
    stream.respond({
      ':status': 500,
    });
    stream.end(`Message: ${message}, Sack: ${stack}`);
  }
};
