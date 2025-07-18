import { Response } from "express";
import Song from "../schemas/songSchema";
import Artist from "../schemas/artistSchema";
import Chart from "../schemas/chartSchema";
import * as z from "zod/v4";
type Artist = z.infer<typeof Artist>;
type Song = z.infer<typeof Song>;
type Chart = z.infer<typeof Chart>;

const createChartResponse = (result: any) => {
  const charts: Chart[] = result.map((row: any) => {
      const artistEnteries = row.artistsWithNationalities ? row.artistsWithNationalities.split(",").map((entry: any) => entry.trim()) : [];
      const artists: Artist[] = artistEnteries.map((entry: any) => {
          const [name, nationality] = entry.split("(").map((part: any) => part.trim());
          return Artist.parse({
              name: name,
              nationality: nationality?.replace(")", "") || null
          })
      })
      const song: Song = Song.parse({
        title: row.title,
        releaseYear: new Date(row.releaseYear).getFullYear(),
          genres: row.genres ? row.genres.split(",") : [],
        artists: artists
      });
      return Chart.parse({
        week: row.chartWeek,
        year: row.chartYear,
        song: song
      });
  });
    return charts;
};

const sendChartResponse = (res: Response, charts: Chart[]) => {
    res.status(200).json({ charts });
}

export { createChartResponse, sendChartResponse}