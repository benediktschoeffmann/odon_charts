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
    const artistEntries = row.artistsWithNationalities
      ? row.artistsWithNationalities
          .split(",")
          .map((entry: any) => entry.trim())
      : [];
    const artists: Artist[] = artistEntries.map((entry: any) => {
      const [name, nationality] = entry
        .split("(")
        .map((part: any) => part.trim());
      return Artist.parse({
        name: name,
        nationality: nationality?.replace(")", "") || null,
      });
    });
    const song: Song = Song.parse({
      title: row.title,
      releaseYear: row.releaseYear,
      genres: row.genres ? row.genres.split(",") : [],
      artists: artists,
    });
    return Chart.parse({
      week: row.chartWeek,
      year: row.chartYear,
      position: row.chartPosition,
      song: song,
    });
  });
  return charts;
};

const sendChartResponse = (res: Response, charts: Chart[]) => {
  res.status(200).json({ charts });
};

export { createChartResponse, sendChartResponse };