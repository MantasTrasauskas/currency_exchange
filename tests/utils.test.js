const utils = require('../src/utils/utils')
const errorHandler = require('../src/handlers/errorHandler')

afterEach(() => {
    jest.clearAllMocks();
});

describe('Utils test', () => {
    test('getRequestParams test', () => {

        const requestParams = utils.getRequestParams({
            ':authority': 'localhost:8443',
            ':method': 'GET',
            ':path': '/curencyexchange?baseCurrency=GBP&quoteCurrency=ILS&baseAmount=100',
            ':scheme': 'https'
        })

        expect(requestParams).toEqual({baseCurrency: 'GBP', quoteCurrency: 'ILS', baseAmount: 100});

    });
    test('getRequestParams invalid int test', () => {

        const requestParams = utils.getRequestParams({
            ':authority': 'localhost:8443',
            ':method': 'GET',
            ':path': '/curencyexchange?baseCurrency=GBP&quoteCurrency=ILS&baseAmount=asasas',
            ':scheme': 'https'
        })

        expect(requestParams).toEqual({baseCurrency: 'GBP', quoteCurrency: 'ILS', baseAmount: NaN});

    });
    test('safeJSON parse test', () => {

        const safeJSON = utils.safeJSON()
        const result = safeJSON.parse(JSON.stringify({ test: 123 }))

        expect(result.item).toEqual({ test: 123 });

    });
    test('safeJSON stringify test', () => {

        const safeJSON = utils.safeJSON()
        const result = safeJSON.stringify({ test: 123 })

        expect(result.item).toEqual(JSON.stringify({ test: 123 }));

    });
    test('safeJSON parse test fail', () => {

        const spy = jest.spyOn(errorHandler, 'errorHandler')

        const safeJSON = utils.safeJSON()
        const result = safeJSON.parse({ test: 123 })

        expect(result).toEqual({
            status: 1,
            item: {}
        });
        expect(spy).toHaveBeenCalled()
    });

});
