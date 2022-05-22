import { ServerHttp2Stream, IncomingHttpHeaders } from 'http2';
import { httpMethod, routePaths } from '../types/enums';
import currencyExchangeHandler from '../handlers/currencyExchangeHandler';
import notFoundHandler from '../handlers/notFoundHandler';
import favIcoHandler from '../handlers/favIcoHandler';
import logger from './logger';

const router = (stream: ServerHttp2Stream, headers: IncomingHttpHeaders) => {
  const path = headers[':path'];
  const method = headers[':method'];

  switch (true) {
    case httpMethod.GET == method &&
      path != undefined &&
      path.indexOf(routePaths.CURRENCY_EXCHANGE) == 0:
      logger.info('currencyexchange hit');
      currencyExchangeHandler(stream, headers);
      break;
    case httpMethod.GET == method &&
      path != undefined &&
      path.indexOf(routePaths.FAVICO) == 0:
      logger.info('Favico hit');
      favIcoHandler(stream, headers);
      break;
    default:
      logger.info('Incorect path hit');
      notFoundHandler(stream, headers);
      break;
  }
};

export default router;
