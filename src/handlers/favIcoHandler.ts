import { IncomingHttpHeaders, ServerHttp2Stream } from 'http2';
import { httpStatusCodes } from '../types/enums';
import logger from '../utils/logger';

//dummy favico response
//TODO return favico
const favIcoHandler = (
  stream: ServerHttp2Stream,
  headers: IncomingHttpHeaders,
) => {
  logger.info('favico headers: %o', headers);
  stream.respond({
    'content-type': 'text/plain; charset=utf-8',
    ':status': httpStatusCodes.OK,
  });
  stream.end();
};

export default favIcoHandler;
