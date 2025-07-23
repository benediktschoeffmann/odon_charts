import { generalErrorCaseTest } from "./generalTestCases";

const error404Tests = describe("404 Error Cases", () => {
  generalErrorCaseTest(
    "Should return 404 when there is no result",
    "/api/songs/title/cxy,baewhi",
    404,
    "Resource not found"
  );
  generalErrorCaseTest(
    "Should return 404 when using invalid url",
    "/asdf",
    404,
    "Endpoint not found"
  );
});

const error400Tests = describe("400 Error Cases", () => {
  generalErrorCaseTest(
    "Should return 400 when parameter isn't set",
    "/api/songs/title",
    400,
    "Parameter isn't set"
  );
  generalErrorCaseTest(
    "Should return 400 when lenght of title is over 200",
    "/api/songs/year/asdffdsaasasdffdsaasasdffdsaasasdffdsaasasdffdsaasasdffdsaasasdffdsaasasdffdsaasasdffdsaasasdffdsaasasdffdsaasasdffdsaasasdffdsaasasdffdsaasasdffdsaasasdffdsaasasdffdsaasasdffdsaasasdffdsaasasdffdsaas1",
    400,
    "Invalid request"
  );
  generalErrorCaseTest(
    "Should return 400 when trying to use string for year",
    "/api/songs/year/asdf",
    400,
    "Invalid request"
  );
  generalErrorCaseTest(
    "Should return 400 when year parameter is too low",
    "/api/songs/year/499",
    400,
    "Invalid request"
  );
  generalErrorCaseTest(
    "Should return 400 when nationality parameter is too long",
    "/api/songs/nationality/ABC",
    400,
    "Invalid request"
  );
  generalErrorCaseTest(
    "Should return 400 when nationality parameter dosn't exists in ISO-2 Country Code table",
    "/api/songs/nationality/HI",
    400,
    "Invalid request"
  );
});

export {error400Tests, error404Tests}