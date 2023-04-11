import { pathsToModuleNameMapper } from "ts-jest";

import { compilerOptions } from "./tsconfig.json";

export default {
  bail: true,
  clearMocks: true,
  collectCoverage: true,
  coverageProvider: "v8",
  collectCoverageFrom: ["<rootDir>/src/modules/**/useCases/**/*.ts"],
  coverageDirectory: "coverage",
  coverageReporters: ["text-summary", "lcov"],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: "<rootDir>/src",
  }),
  preset: "ts-jest",
  resolver: undefined,
  testMatch: ["**/*.spec.ts"],
};
