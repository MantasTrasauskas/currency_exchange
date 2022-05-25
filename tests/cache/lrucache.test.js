const LRUCache = require('../../src/cache/LRUcache').default
require('dotenv').config();

afterEach(() => {
    jest.clearAllMocks();
});

const ratesUsd = { 'USD': 1, 'EUR': 2, 'ILS': 3, 'GBP': 3.2 }
const ratesEur = { 'USD': 2, 'EUR': 1, 'ILS': 3, 'GBP': 3.2 }
const ratesIls = { 'USD': 3, 'EUR': 2, 'ILS': 1, 'GBP': 3.2 }
const ratesGbp = { 'USD': 4, 'EUR': 2, 'ILS': 3, 'GBP': 1 }

describe('LRUCache test', () => {
    test('LRUCache get/put test', () => {
        const rates = { 'USD': 1, 'EUR': 2, 'ILS': 3 }

        const lRUCache = new LRUCache();
        expect(lRUCache.get('USD')).toEqual(null)
        lRUCache.put('USD', ratesUsd)
        expect(lRUCache.get('USD')).toEqual(ratesUsd)
    });
    test('LRUCache put maxEntries test', () => {

        const lRUCache = new LRUCache();
        lRUCache.put('USD', ratesUsd)
        lRUCache.put('EUR', ratesEur)
        lRUCache.put('ILS', ratesIls)
        lRUCache.put('GBP', ratesGbp)
        lRUCache.put('USD', ratesUsd)

        expect(lRUCache.getSize()).toEqual(3)
    });
});
