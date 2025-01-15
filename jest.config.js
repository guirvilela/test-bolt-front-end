const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}",  
    "!src/**/*.d.ts",  
  ],
  coverageDirectory: "coverage",  
  coverageReporters: ["text", "lcov", "json"],
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1', 
  },
};

module.exports = createJestConfig(customJestConfig);