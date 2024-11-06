/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import { JestConfigWithTsJest } from "ts-jest";

//import type {Config} from 'jest';
//import type { JestConfigWithTsJest } from 'jest';

const config: JestConfigWithTsJest =  {
  transform: {
    // '^.+\\.[tj]sx?$' для обработки файлов js/ts с помощью `ts-jest`
    // '^.+\\.m?[tj]sx?$' для обработки файлов js/ts/mjs/mts с помощью `ts-jest`
    '^.+\\.tsx?$': [
      'ts-jest',
  {
   preset: 'ts-jest',
 
  collectCoverage: true,

  coverageDirectory: "coverage",

  coverageProvider: "v8",

}],}
};

export default config;
