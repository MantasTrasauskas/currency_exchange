import { IRequest } from '../types/commonTypes';
import { AvilableCurrencies } from '../types/enums';
import { queryString } from '../types/enums';

//simple queryString value validator
//check curreny types and valid amounts
export const areQueryValuesValid = (requestParams: IRequest): boolean => {
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  let result: boolean = true;
  for (const [key, value] of Object.entries(requestParams)) {
    switch (key) {
      case queryString.BASE_CURRECNY:
      case queryString.QUOTE_CURRENCY:
        if (value == null) result = false;
        if (Object.keys(AvilableCurrencies).indexOf(value) == -1)
          result = false;
        break;
      case queryString.BASE_AMMOUNT:
        if (value == null) result = false;
        if (isNaN(value)) result = false;
        if (value <= 0) result = false;
        break;
    }
  }
  return result;
};
