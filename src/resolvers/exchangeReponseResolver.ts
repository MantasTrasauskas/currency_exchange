import { IRequest, IResponse, IRates } from '../types/commonTypes';
import LRUCache from '../cache/LRUcache';

const lruCache = new LRUCache();
const exchangeReponseResolver = async (
  requestParams: IRequest,
): Promise<IResponse> => {
  const rates: IRates = await lruCache.get(<string>requestParams.baseCurrency);
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
