import { IRequest, IResponse, Rates } from '../types/commonTypes';
import LRUCache from '../cache/LRUcache';

let lruCache = new LRUCache();
const exchangeReponseResolver = async (requestParams: IRequest): Promise<IResponse> => {
  const rates: Rates = await lruCache.get(<string>requestParams.baseCurrency);
  const exchangeRate: number = rates[<string>requestParams.quoteCurrency];
  const quoteAmount: number = <number>requestParams.baseAmount * exchangeRate;
  return {
    exchangeRate: exchangeRate,
    quoteAmount: quoteAmount,
  };
};

export default exchangeReponseResolver;
