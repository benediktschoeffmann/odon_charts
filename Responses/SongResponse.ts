import { Response } from "express";
import Song from "../schemas/songSchema";
import { title } from "process";
import Artist from '../schemas/artistSchema';
import * as z from "zod/v4"

const createSongResponse = (result: any) => {
  const songs = result.map((row: any) => {
    const artistsNames: string[] = row.artists ? row.artists.split(",") : [];
    const artists = artistsNames.map((artistName) =>
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

const sendSongResponse = (res: Response, data: any) => {
  res.status(200).json(data);
};

export { createSongResponse, sendSongResponse };
