import chartsTests from "./chartTestCases";
import songsTests from "./songTestCases";
import { error404Tests, error400Tests } from "./errorTestCases";


describe("Testing index file", () => {
  describe("Happy cases", () => {
    songsTests
    chartsTests
  });

  describe("Error cases", () => {
    error400Tests;
    error404Tests;
  });
});
