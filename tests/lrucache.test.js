const LRUCache = require('../src/cache/LRUcache').default
const exchangeRateResolver = require('../src/resolvers/exchangeRateResolver').default;
require('dotenv').config();

jest.mock('../src/resolvers/exchangeRateResolver'.default, () => jest.fn());


describe('LRUCache test', () => {
    test('LRUCache get test', () => {

        const lRUCache = new LRUCache();
        lRUCache.get('USD').then((result) => {
            expect(result['USD']).toEqual(1);
        })
    });

});
