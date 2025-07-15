import app from "../src/index";
const supertest = require("supertest");
const requestWithSupertest = supertest(app);

const generalHappyCaseTest = (testDescription: string, requestRoute: string, containValue?: object) => {
  it(testDescription, async () => {
    const res = await requestWithSupertest.get(requestRoute);
    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body).toHaveProperty("songs");

    if (containValue) {
      expect(res.body.songs).toEqual(
        expect.arrayContaining(
          res.body.songs.map(() => expect.objectContaining(containValue)))
      );
    }
    
  })
}

const generalErrorCaseTest = (testDescription: string, requstRoute: string, statusCode: number, errorMessage: string) => {
  it(testDescription, async () => {
    const res = await requestWithSupertest.get(requstRoute);
    expect(res.status).toEqual(statusCode);
    expect(res.type).toEqual(expect.stringContaining("json"));

    expect(res.body).toEqual(
      expect.objectContaining({
        message: errorMessage
      })
    )
  })
}

describe("Testing index file", () => {
  describe("Happy cases", () => {
    generalHappyCaseTest("GET /api/songs should return all songs", "/api/songs")
    generalHappyCaseTest(
      "GET /api/songs/title/:title should return songs with specific title",
      "/api/songs/title/We%20Will%20Rock%20you",
      {title: "We Will Rock you"},
    );
    generalHappyCaseTest(
      "GET /api/songs/year/:year should return all songs from specific year",
      "/api/songs/year/1970",
      {releaseYear: 1970}
    );
    generalHappyCaseTest(
      "GET /api/songs/artist/:artist should retuntn all songs from specific artist",
      "/api/songs/artist/falco",
      {
        artists: expect.arrayContaining([
          expect.objectContaining({
          name: "Falco"
        })
      ])}
    )
    generalHappyCaseTest(
      "GET /api/songs/genre/:genre should return all songs from specific genre",
      "/api/songs/genre/pop",
      {
        genres: expect.arrayContaining([
          "Pop"
        ])
      }
    )
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
  })

  describe("Error cases", () => {
    it("Should return 404 when parameter isn't set", async () => {
      const res = await requestWithSupertest.get("/api/songs/genre");
      expect(res.status).toEqual(404);
      expect(res.type).toEqual(expect.stringContaining("json"));
      expect(res.body).toMatchObject({
        message: "Endpoint not found"
      });
    })

    it("Should return 404 when result is empty", async () => {
      const res = await requestWithSupertest.get("/api/songs/year/0000");
      expect(res.status).toEqual(404);
      expect(res.type).toEqual(expect.stringContaining("json"));
      expect(res.body).toEqual(
        expect.objectContaining({
          message: "Resource not found"
        })
      );
    })
  })

});
