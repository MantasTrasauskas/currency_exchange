import { IncomingHttpHeaders, ServerHttp2Stream } from 'http2';
import { IRequest, IResponse } from '../types/commonTypes';
import { getRequestParams, safeJSON } from '../utils/utils';
import { areQueryValuesValid } from '../utils/validators';
import { errorHandler } from './errorHandler';
import exchangeReponseResolver from '../resolvers/exchangeReponseResolver';
import { httpStatusCodes, safeJSONStatus } from '../types/enums';
import logger from '../utils/logger';

const currencyExchangeHandler = async (
  stream: ServerHttp2Stream,
  headers: IncomingHttpHeaders,
) => {
  logger.info('currencyExchange headers: %o', headers);

  const requestParams: IRequest = getRequestParams(headers);
  if (!areQueryValuesValid(requestParams)) {
    errorHandler('Invalid query parameters', stream);
    return;
  }
  logger.info('queryParams: %o', requestParams);
  let result: IResponse = {
    exchangeRate: 0,
    quoteAmount: 0,
  };
  try {
    result = await exchangeReponseResolver(requestParams);
  } catch (error: any) {
    errorHandler(`${error.message}`, stream);
    return;
  }
  const response = safeJSON().stringify(result);

  if (response.status == safeJSONStatus.ERROR) {
    stream.respond({
      ':status': httpStatusCodes.INTERNAL_SERVER_ERROR,
    });
    stream.end('Server error parsing result');
    return;
  }

  if (response.status == safeJSONStatus.OK) {
    stream.respond({
      ':status': httpStatusCodes.OK,
    });
    stream.end(response.item);
    return;
  }
};

export default currencyExchangeHandler;
