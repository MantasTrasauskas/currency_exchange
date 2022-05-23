import { IncomingHttpHeaders, ServerHttp2Stream } from 'http2';
import { httpStatusCodes, httpResposeMsg } from '../types/enums';
import logger from '../utils/logger';

//if hit on incorrect path return err
const notFoundHandler = (
  stream: ServerHttp2Stream,
  headers: IncomingHttpHeaders,
) => {
  logger.info('notFound headers: %o', headers);
  stream.respond({
    'content-type': 'text/plain; charset=utf-8',
    ':status': httpStatusCodes.NOT_FOUND,
  });
  stream.end(httpResposeMsg.NOT_FOUND);
};

export default notFoundHandler;
