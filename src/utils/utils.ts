import { IncomingHttpHeaders } from 'http2';
import { IRequest, ISafeJSONResult } from '../types/commonTypes';
import { queryString } from '../types/enums';
import { errorHandler } from '../handlers/errorHandler';
import { safeJSONStatus } from '../types/enums';

//extract request params from query string
export const getRequestParams = (headers: IncomingHttpHeaders): IRequest => {
  const requestURL = new URL(
    <string>headers[':path'],
    `https://${headers[':authority']}`,
  );

  const baseAmount = requestURL.searchParams.get(queryString.BASE_AMMOUNT);

  return {
    baseCurrency: requestURL.searchParams.get(queryString.BASE_CURRECNY),
    quoteCurrency: requestURL.searchParams.get(queryString.QUOTE_CURRENCY),
    baseAmount: baseAmount != null ? parseFloat(baseAmount) : null,
  };
};

//JSON parse with integrated err handler
//TODO there are better npm pacakages I am sure
export const safeJSON = () => {
  const parse = (item: string): ISafeJSONResult => {
    // eslint-disable-next-line prefer-const
    let result: ISafeJSONResult = {
      status: safeJSONStatus.OK,
      item: {},
    };
    try {
      result.item = JSON.parse(item);
    } catch (error) {
      errorHandler(`Can not parse item ${item}`);
      result.status = safeJSONStatus.ERROR;
    }
    return result;
  };

  const stringify = (item: object): ISafeJSONResult => {
    // eslint-disable-next-line prefer-const
    let result: ISafeJSONResult = {
      status: safeJSONStatus.OK,
      item: '',
    };
    try {
      result.item = JSON.stringify(item);
    } catch (error) {
      errorHandler(`Can not stringify item ${item}`);
      result.status = safeJSONStatus.ERROR;
    }
    return result;
  };
  return {
    parse,
    stringify,
  };
};
