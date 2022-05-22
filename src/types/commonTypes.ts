import { safeJSONStatus } from './enums';

export interface IRequest {
  baseCurrency: string | null;
  quoteCurrency: string | null;
  baseAmount: number | null;
}

export interface IResponse {
  exchangeRate: number;
  quoteAmount: number;
}

export interface IProcessEnv {
  APP_PORT: number;
  CURRENY_EXHCANGE_API_DOMAIN: string;
  CURRENY_EXHCANGE_API_PATH: string;
}

export interface IRates {
  [name: string]: number;
}

export interface ISafeJSONResult {
  status: safeJSONStatus;
  item: object | string | any;
}
