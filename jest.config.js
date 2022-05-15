const path = require('path');

// all tests which are date dependent will use the GMT time zone
process.env.TZ = 'GMT';

module.exports = {
  projects: [
    {
      displayName: 'currency-exchange',
      testMatch: ['<rootDir>/tests/*.test.(js)'],
      rootDir: path.resolve(__dirname, 'src'),
      testPathIgnorePatterns: ['/node_modules/'],
      coveragePathIgnorePatterns: ['/node_modules/', '/tests/', '/dist/'],
      transform: {
        '^.+\\.ts?$': 'ts-jest',
      },
    },
  ],
  reporters: [
    'default',
    'jest-junit',
    [
      './node_modules/jest-html-reporter',
      {
        pageTitle: 'Test Report',
      },
    ],
  ],
  coverageReporters: [
    'json',
    'lcov',
    'text',
    'clover',
    'text-summary',
    'cobertura',
  ],
  "testResultsProcessor": "jest-jenkins-reporter",
  "coverageThreshold": {
    "global": {
      // "branches": 80,
      // "functions": 80,
      "lines": 80,
      // "statements": -10
    }
  },
};