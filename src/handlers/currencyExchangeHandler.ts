import { IncomingHttpHeaders, ServerHttp2Stream } from 'http2';
import { IRequest, IResponse } from '../types/commonTypes';
import { extractParamsFromPath, safeJSON } from '../utils/utils';
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

  //validate query params
  const requestParams: IRequest = extractParamsFromPath(headers);
  if (!areQueryValuesValid(requestParams)) {
    errorHandler('Invalid query parameters', stream);
    return;
  }

  logger.info('queryParams: %o', requestParams);

  let result: IResponse = {
    exchangeRate: 0,
    quoteAmount: 0,
  };

  //get exchnage curreny value
  try {
    result = await exchangeReponseResolver(requestParams);
  } catch (error: any) {
    errorHandler(`${error.message}`, stream);
    return;
  }
  //stringify result for response
  const response = safeJSON().stringify(result);

  // if failed to stringify handle err
  if (response.status == safeJSONStatus.ERROR) {
    errorHandler('Can not parse result', stream);
    return;
  }
  //return result
  stream.respond({
    ':status': httpStatusCodes.OK,
  });
  stream.end(response.item);
};

export default currencyExchangeHandler;
