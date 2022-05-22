import { IRequest } from '../types/commonTypes';
import { AvilableCurrencies } from '../types/enums'

export const areQueryValuesValid = (requestParams: IRequest): boolean => {
  let result: boolean = true;
  for (const [key, value] of Object.entries(requestParams)) {
    switch (key) {
      case 'baseCurreny':
      case 'quoteCurrency':
        if(value == null) result = false;
        if(Object.keys(AvilableCurrencies).indexOf(value) == -1) result = false;
        break;
      case 'baseAmount':
        if(value == null) result = false;
        if(isNaN(value)) result = false;
        break;
    }
  }
  return result;
};
