import http2 from 'http2';
import { Rates } from '../types/commonTypes';
import { safeJSONStatus } from '../types/enums';
import logger from '../utils/logger';
import { safeJSON } from '../utils/utils';

const exchangeRateResolver = (curreny: string): Promise<Rates> => {
  const session = http2.connect(
    <string>process.env.CURRENY_EXHCANGE_API_DOMAIN,
  );

  return new Promise((resolve, reject) => {
    session.on('error', (err) => reject(err));

    const req = session.request({
      ':path': `${<string>process.env.CURRENY_EXHCANGE_API_PATH}${curreny}`,
    });

    req.end();

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
