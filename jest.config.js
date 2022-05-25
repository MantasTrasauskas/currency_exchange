const path = require('path');

// all tests which are date dependent will use the GMT time zone
process.env.TZ = 'GMT';

module.exports = {
  projects: [
    {
      displayName: 'currency-exchange',
      testMatch: ['<rootDir>/tests/**/*.test.(js)',],
      rootDir: path.resolve(__dirname, '.'),
      testPathIgnorePatterns: ['/node_modules/'],
      coveragePathIgnorePatterns: ['/node_modules/', '/tests/', '/dist/', '/src/types/'],
      transform: {
        '^.+\\.ts?$': 'ts-jest',
      },
    },
  ],
  coverageReporters: [
    'json',
    'lcov',
    'text',
    'clover',
    'text-summary',
    'cobertura',
  ],
  "coverageThreshold": {
    "global": {
      // "branches": 80,
      // "functions": 80,
      "lines": 80,
      // "statements": -10
    }
  },
};
