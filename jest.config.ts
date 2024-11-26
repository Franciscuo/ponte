export default {
  rootDir: './',
  collectCoverageFrom: ['**/*.ts'],
  coverageDirectory: './coverage',
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/test/',
    '/.yalc/',
    '/dist/',
    'jest.config.ts',
    'src/main.ts',
    '^.*\\.module\\.[jt]s?$',
    '^.*\\.enum\\.[jt]s?$',
    '^.*\\.config\\.[jt]s?$',
    '^.*\\.migration\\.[jt]s?$',
    '^.*\\.dto\\.[jt]s?$',
    '^.*\\index\\.[jt]s?$',
    '^.*\\.entity\\.[jt]s?$',
  ],
  testMatch: ['**/*.spec.ts'],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  moduleDirectories: ['node_modules', 'src'],
  moduleFileExtensions: ['js', 'json', 'ts'],
  testEnvironment: 'node',
  testResultsProcessor: 'jest-sonar-reporter',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  clearMocks: true,
  resetMocks: true,
  restoreMocks: true,
  setupFiles: ['dotenv/config'],
};