import { Response } from "express";
import Song from "../schemas/songSchema";
import Artist from '../schemas/artistSchema';
import * as z from "zod/v4";
type Artist = z.infer<typeof Artist>
type Song = z.infer<typeof Song>

const createSongResponse = (result: any) => {
  const songs: Song[] = result.map((row: any) => {
    const artistEnteries = row.artistsWithNationalities ? row.artistsWithNationalities.split(",").map((entry: any) => entry.trim()) : [];
    //const artistsNames: string[] = row.artists ? row.artists.split(",") : [];
    //const artistsNationalities: string[] = row.nationalities ? row.nationalities.split(",") : [];
    const artists: Artist[] = artistEnteries.map((entry: any) => {
      const [name, nationality] = entry.split("(").map((part: any) => part.trim());
      return Artist.parse({
        name: name,
        nationality: nationality?.replace(")", "") || null
      });
    });
    return Song.parse({
      title: row.title,
      releaseYear: new Date(row.releaseYear).getFullYear(),
      genres: row.genres ? row.genres.split(",") : [],
      artists: artists,
    });
  }
  );
  return songs;
};

const sendSongResponse = (res: Response, songs: Song[]) => {
  res.status(200).json({songs});
};

export { createSongResponse, sendSongResponse };
