import app from "../src/index";
const supertest = require("supertest");
const requestWithSupertest = supertest(app);

const generalHappyCaseTest = (
  testDescription: string,
  requestRoute: string,
  containValue?: object
) => {
  it(testDescription, async () => {
    const res = await requestWithSupertest.get(requestRoute);
    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body).toHaveProperty("songs");

    if (containValue) {
      expect(res.body.songs).toEqual(
        expect.arrayContaining(
          res.body.songs.map(() => expect.objectContaining(containValue))
        )
      );
    }
  });
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

// describe("testing", () => {
//   test('is it a json'), () => {
//     expect
//   }

// })

test("json output", () => {
  let json = '{"name" : "Benni"}';
  let response = JSON.stringify({ name: "Benni" });
  //expect(json).toMatchJSON(response);
});

describe("Testing index file", () => {
  describe("Happy cases", () => {
    generalHappyCaseTest(
      "GET /api/songs should return all songs",
      "/api/songs"
    );
    generalHappyCaseTest(
      "GET /api/songs/title/:title should return songs with specific title",
      "/api/songs/title/We%20Will%20Rock%20you",
      { title: "We Will Rock you" }
    );
    generalHappyCaseTest(
      "GET /api/songs/year/:year should return all songs from specific year",
      "/api/songs/year/1970",
      { releaseYear: 1970 }
    );
    generalHappyCaseTest(
      "GET /api/songs/artist/:artist should retuntn all songs from specific artist",
      "/api/songs/artist/falco",
      {
        artists: expect.arrayContaining([
          expect.objectContaining({
            name: "Falco",
          }),
        ]),
      }
    );
    generalHappyCaseTest(
      "GET /api/songs/genre/:genre should return all songs from specific genre",
      "/api/songs/genre/pop",
      {
        genres: expect.arrayContaining(["Pop"]),
      }
    );
    generalHappyCaseTest(
      "GET /api/songs/nationality/:nationality should return all songs where artist has specific nationality",
      "/api/songs/nationality/AT",
      {
        artists: expect.arrayContaining([
          expect.objectContaining({
            nationality: "AT",
          }),
        ]),
      }
    );
  });

  describe("Error cases", () => {
    describe("404 Error Cases", () => {
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

    describe("400 Error Cases", () => {
      generalErrorCaseTest(
        "Should return 400 when parameter isn't set",
        "/api/songs/genre",
        400,
        "Parameter isn't set"
      );
      generalErrorCaseTest(
        "Should return 400 when trying to use string for year",
        "/api/songs/year/asdf",
        400,
        "Invalid request"
      );
      generalErrorCaseTest(
        "Should return 400 when year parameter is too low",
        "api/songs/year/499",
        400,
        "Invalid request"
      )
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
  });
});
