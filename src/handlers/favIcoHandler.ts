import { IncomingHttpHeaders, ServerHttp2Stream } from 'http2';
import { httpStatusCodes } from '../types/enums';
import logger from '../utils/logger';

const favIcoHandler = (
  stream: ServerHttp2Stream,
  headers: IncomingHttpHeaders,
) => {
  
  stream.respond({
    'content-type': 'text/plain; charset=utf-8',
    ':status': httpStatusCodes.OK,
  });
  stream.end();
};

export default favIcoHandler;
