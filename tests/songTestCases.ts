import { generalHappySongCaseTest } from "./generalTestCases";

const songsTests = describe("Song cases", () => {
    generalHappySongCaseTest(
      "GET /api/songs should return all songs",
      "/api/songs"
    );
    generalHappySongCaseTest(
      "GET /api/songs/title/:title should return songs with specific title",
      "/api/songs/title/We%20Will%20Rock%20you",
      { title: "We Will Rock you" },
      { title: "Awarakadawara" }
    );
    generalHappySongCaseTest(
      "GET /api/songs/year/:year should return all songs from specific year",
      "/api/songs/year/1970",
      { releaseYear: 1970 },
      { releaseYear: 2017 }
    );
    generalHappySongCaseTest(
      "GET /api/songs/artist/:artist should retuntn all songs from specific artist",
      "/api/songs/artist/falco",
      {
        artists: expect.arrayContaining([
          expect.objectContaining({
            name: "Falco",
          }),
          expect.not.objectContaining({
            name: "Ernst Molden",
          }),
        ]),
      }
    );
    generalHappySongCaseTest(
      "GET /api/songs/genre/:genre should return all songs from specific genre",
      "/api/songs/genre/pop",
      {
        genres: expect.arrayContaining(["Pop"]),
      }
    );
    generalHappySongCaseTest(
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

export default songsTests;