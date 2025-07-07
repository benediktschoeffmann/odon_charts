import { Response } from "express";
import Song from '../models/song_model';

const sendSongRespone = (res: Response, result: any) => {
  const songs: Song = result.map((row: any) => ({
    title: row.title,
    releaseYear: new Date(row.releaseYear).getFullYear(),
    genres: row.genres ? row.genres.split(",") : [],
    artists: row.artists ? row.artists.split(",") : [],
  }));

  res.json({ songs });
};

export default sendSongRespone