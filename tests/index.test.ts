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
        expect.arrayContaining([
          expect.objectContaining(
            containValue
          ),
        ])
      );
    }
    
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

    generalHappyCaseTest

    it("GET /api/songs/nationality/:nationality should return all songs where artist has specific nationality", async () => {
      const res = await requestWithSupertest.get("/api/songs/nationality/AT");
      expect(res.status).toEqual(200);
      expect(res.type).toEqual(expect.stringContaining("json"));
      expect(res.body).toHaveProperty("songs");

      //const hasExpectedNationality: boolean = res.body.songs.every((song: any) => {
      //    return song.artists.every((artist: any) => {
      //      return artist.nationality === "AT";
      //    });
      //  }
      //);
      //expect(hasExpectedNationality).toBe(true);

      expect(res.body.songs).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            artists: expect.arrayContaining([
              expect.objectContaining({
                nationality: "AT"
              })
            ])
          })
        ])
      )

    });
  })
});
