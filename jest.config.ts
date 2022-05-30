/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  cacheDirectory: '.tmp/jestCache',
  modulePaths: ['.', './src'],
  globals: {
    'ts-jest': { isolatedModules: true }
  },
  testTimeout: 20000
};
