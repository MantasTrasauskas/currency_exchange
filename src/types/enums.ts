export enum httpMethod {
  GET = 'GET',
  POST = 'POST',
}

export enum routePaths {
  CURRENCY_EXCHANGE = '/curencyexchange?',
  FAVICO = '/favicon.ico',
}

export enum httpStatusCodes {
  OK = 200,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

export enum httpResposeMsg {
  NOT_FOUND = "These are't the droids you'r looking for.",
}

export enum queryString {
  BASE_CURRECNY = 'baseCurrency',
  QUOTE_CURRENCY = 'quoteCurrency',
  BASE_AMMOUNT = 'baseAmount',
}

export enum AvilableCurrencies {
  USD = 'USD',
  EUR = 'EUR',
  GBP = 'GBP',
  ILS = 'ILS',
}

export enum safeJSONStatus {
  OK,
  ERROR,
}
