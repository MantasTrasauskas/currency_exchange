const LRUCache = require('../src/cache/LRUcache').default
const exchangeRateResolver = require('../src/resolvers/exchangeRateResolver');
require('dotenv').config();

afterEach(() => {
    jest.clearAllMocks();
});

describe('LRUCache test', () => {
    test('LRUCache get with api call test', () => {
        let spy = jest.spyOn(exchangeRateResolver, 'default')

        const lRUCache = new LRUCache();
        return lRUCache.get('USD').then((result) => {
            expect(result['USD']).toEqual(1);
            expect(spy).toHaveBeenLastCalledWith('USD');
            expect(spy).toHaveBeenCalledTimes(1);
        })
    });
    test('LRUCache get without api calltest', () => {
        let spy = jest.spyOn(exchangeRateResolver, 'default')

        const lRUCache = new LRUCache();
        return lRUCache.get('USD').then(() => {
            lRUCache.get('USD').then(() => {
                expect(spy).toHaveBeenCalledTimes(1);
            })
        });
    });
});
