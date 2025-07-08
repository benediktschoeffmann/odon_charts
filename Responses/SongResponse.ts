import { Response } from "express";
import Song from "../models/songModel";

const createSongResponse = (result: any) => {
  const songs: Song = result.map((row: any) => ({
    title: row.title,
    releaseYear: new Date(row.releaseYear).getFullYear(),
    genres: row.genres ? row.genres.split(",") : [],
    artists: row.artists ? row.artists.split(",") : [],
  }));
  return songs;
};

const sendSongResponse = (res: Response, data: any) => {
  res.status(200).json(data);
};

export { createSongResponse, sendSongResponse };
