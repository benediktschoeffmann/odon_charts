import app from "../src/index";
const supertest = require("supertest");
const requestWithSupertest = supertest(app);

const generalHappyCaseTest = (
  testDescription: string,
  requestRoute: string,
  propertyValue: string,
  containValue?: object,
  antiContainValue?: object
) => {
  it(testDescription, async () => {
    const res = await requestWithSupertest.get(requestRoute);
    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body).toHaveProperty(propertyValue);

    if (containValue) {
      expect(res.body[propertyValue]).toEqual(
        expect.arrayContaining(
          res.body[propertyValue].map((data: any) => {
            expect(data).toEqual(expect.objectContaining(containValue));
            if (antiContainValue)
              expect(data).toEqual(
                expect.not.objectContaining(antiContainValue)
              );
            return data;
          })
        )
      );
    }
  });
};

const generalHappySongCaseTest = (
  testDescription: string,
  requestRoute: string,
  containValue?: object,
  antiContainValue?: object
) => {
  generalHappyCaseTest(
    testDescription,
    requestRoute,
    "songs",
    containValue,
    antiContainValue
  );
};

const generalHappyChartCaseTest = (
  testDescription: string,
  requestRoute: string,
  containValue?: object,
  antiContainValue?: object
) => {
  generalHappyCaseTest(
    testDescription,
    requestRoute,
    "charts",
    containValue,
    antiContainValue
  );
};

const generalErrorCaseTest = (
  testDescription: string,
  requstRoute: string,
  statusCode: number,
  errorMessage: string
) => {
  it(testDescription, async () => {
    const res = await requestWithSupertest.get(requstRoute);
    expect(res.status).toEqual(statusCode);
    expect(res.type).toEqual(expect.stringContaining("json"));

    expect(res.body).toEqual(
      expect.objectContaining({
        message: errorMessage,
      })
    );
  });
};

export { generalErrorCaseTest, generalHappyCaseTest, generalHappyChartCaseTest, generalHappySongCaseTest };