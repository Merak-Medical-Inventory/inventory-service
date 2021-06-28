module.exports = {
  preset: 'ts-jest',
  roots: [
    "<rootDir>"
  ],
  testMatch: [
    "**/__tests__/**/*.+(ts|tsx|js)",
    "**/?(*.)+(spec|test).+(ts|tsx|js)"
  ],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
  testEnvironment: 'node',
  collectCoverage : true,
  coverageDirectory : 'coverage',
  testPathIgnorePatterns : [
    "/node_modules/"
  ],
  verbose : true,
  coverageThreshold : {
    global : {
      branches : 0,
      functions : 70,
      lines :70,
      statements : 70
    }
  },
  moduleNameMapper: {
    "^@entity/(.*)$": "<rootDir>/src/db/entity/$1",
    "^@db/(.*)$": "<rootDir>/src/db/$1",
    "^@services/(.*)$": "<rootDir>/src/services/$1",
    "^@helpers/(.*)$": "<rootDir>/src/helpers/$1",
    "^@middlewares/(.*)$": "<rootDir>/src/middlewares/$1",
    "^@seeds/(.*)$": "<rootDir>/src/seeds/$1",
    "^@controllers/(.*)$": "<rootDir>/src/controllers/$1",
    "^@shared/(.*)$": "<rootDir>/src/shared/$1",
    "^@migration/(.*)$": "<rootDir>/src/migration/$1",
  } 
};