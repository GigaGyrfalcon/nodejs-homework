module.exports = {
  roots: ['<rootDir>/src/controllers/'],
  testPathIgnorePatterns: ['<rootDir>/src/services/'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  collectCoverageFrom: ['src/controllers/**/{!(ignore-me),}controller.ts'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  },
  coverageReporters: ['json', 'lcov', 'text', 'clover']
};
