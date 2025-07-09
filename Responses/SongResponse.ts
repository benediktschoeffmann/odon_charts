import { Response } from "express";
import Song from "../schemas/songSchema";
import { title } from "process";
import Artist from '../schemas/artistSchema';
import * as z from "zod/v4";
type Artist = z.infer<typeof Artist>
type Song = z.infer<typeof Song>

const createSongResponse = (result: any) => {
  const songs: Song[] = result.map((row: any) => {
    const artistsNames: string[] = row.artists ? row.artists.split(",") : [];
    const artists: Artist[] = artistsNames.map((artistName) =>
      Artist.parse({
        name: artistName,
        nationality: row.nationality,
      })
    );
    console.log(artists)
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
