import http2 from 'http2';
import { IRates } from '../types/commonTypes';
import { safeJSONStatus } from '../types/enums';
import logger from '../utils/logger';
import { safeJSON } from '../utils/utils';

//http2 sends request to 3rd party
const exchangeRateResolver = (curreny: string): Promise<IRates> => {
  return new Promise((resolve, reject) => {
    const session = http2.connect(
      <string>process.env.CURRENY_EXHCANGE_API_DOMAIN,
    );
    session.on('error', (error) => {
      reject(error);
    });

    //open session start request
    const req = session.request({
      ':path': `${<string>process.env.CURRENY_EXHCANGE_API_PATH}${curreny}`,
    });

    req.end();

    //hanlde response
    req.on('response', (headers) => {
      logger.info('currency exhange api: %o', headers);
    });

    req.setEncoding('utf8');
    let data = '';

    req.on('data', (chunk) => {
      data += chunk;
    });

    req.on('end', () => {
      const result = safeJSON().parse(data);
      if (result.status == safeJSONStatus.OK) {
        if (result.item.hasOwnProperty('rates')) {
          resolve(result.item.rates);
        } else {
          reject(new Error('Could not parse api response'));
        }
      }
      if (result.status == safeJSONStatus.ERROR) {
        reject(new Error('Could not parse api response'));
      }
      session.close();
    });
  });
};

export default exchangeRateResolver;
