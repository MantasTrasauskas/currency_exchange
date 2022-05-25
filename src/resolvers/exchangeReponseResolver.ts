import { IRequest, IResponse, IRates } from '../types/commonTypes';
import LRUCache from '../cache/LRUcache';
import exchangeRateResolver from './exchangeRateResolver';

const lruCache = new LRUCache(parseInt(<string>process.env.LRU_CACHE_SIZE));
//get curreny rates and calculate
//TODO typecasting does not look nicey
//TODO rounding could be and env var
const exchangeReponseResolver = async (
  requestParams: IRequest,
): Promise<IResponse> => {
  let rates: IRates | null = lruCache.get(<string>requestParams.baseCurrency);

  if (rates == null) {
    rates = await exchangeRateResolver(<string>requestParams.baseCurrency);
    lruCache.put(<string>requestParams.baseCurrency, rates);
  }

  const exchangeRate: number = rates[<string>requestParams.quoteCurrency];
  const quoteAmount = Number(
    (<number>requestParams.baseAmount * exchangeRate).toFixed(3),
  );

  return {
    exchangeRate: exchangeRate,
    quoteAmount: quoteAmount,
  };
};

export default exchangeReponseResolver;
