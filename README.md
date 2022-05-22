# currency_exchange
Currency exchange API
## Setup
Please install

1. Node 18
2. yarn 
3. typescript
4. docker (optional)

## Start api

1. yarn
2. yarn init:env
3. yarn start

Visual studio code lauch config added as well

## Query api
Example:
```
https://localhost:8443/curencyexchange?baseCurrency=GBP&quoteCurrency=ILS&baseAmount=asdasdasd
```
Query parameter Description
```
baseCurrency String, 3 letters ISO currency code. Currency to convert from.
quoteCurrency String, 3 letters ISO currency code. Currency to convert to.
baseAmount Integer. The amount to convert.
```
LRUcache size defaults to 3

Postman is not working as it does not support http2 or at least was not able to make it work.

## TODO
1. Unit test coverage is bad.
2. Unit test should be ES6
3. Add more logging including additional log levels
4. Any type is used in severl places
5. Error handler need to be more sophisticated.
6. No proper error handling when querryng 3rd party service.
7. LRUcahce size could be set buy env var.
8. No env var validation.
9. Env vars only in file.
10. No setup for translations.
11. No comments
12. Router path selection could be more sophisticated.
