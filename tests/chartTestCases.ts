import { generalHappyChartCaseTest } from "./generalTestCases";

const chartsTests = describe("Chart cases", () => {
  generalHappyChartCaseTest(
    "GET /api/charts should return all songs",
    "/api/charts"
  );
  generalHappyChartCaseTest(
    "GET /api/charts/title/:title should return chart with title",
    "/api/charts/title/Jupiter",
    { song: expect.objectContaining({ title: "Jupiter" }) },
    { song: expect.objectContaining({ title: "Ordinary" }) }
  );
  generalHappyChartCaseTest(
    "GET /api/charts/releaseYear/:releaseYear should return all charts where song released in this year",
    "/api/charts/releaseYear/2025",
    { song: expect.objectContaining({ releaseYear: 2025 }) },
    { song: expect.objectContaining({ releaseYear: 2024 }) }
  );
  generalHappyChartCaseTest(
    "GET /api/charts/artist/:artist should return all charts from specific artist",
    "/api/charts/artist/Apache%20207",
    {
      song: expect.objectContaining({
        artists: expect.arrayContaining([
          expect.objectContaining({ name: "Apache 207" }),
        ]),
      }),
    }
  );
  generalHappyChartCaseTest(
    "GET /api/charts/year/:year should return charts from year",
    "/api/charts/year/2025",
    { year: 2025 },
    { year: 2024 }
  );
  generalHappyChartCaseTest(
    "GET /api/charts/year/:year/week/:week should return charts from specific year and week",
    "/api/charts/year/2025/week/28",
    { week: 28, year: 2025 },
    { week: 29, year: 2024 }
  );
  generalHappyChartCaseTest(
    "GET /api/charts/position/:position should return charts with specific position",
    "/api/charts/position/1",
    { position: 1 },
    { position: 2 }
  );
});

export default chartsTests;