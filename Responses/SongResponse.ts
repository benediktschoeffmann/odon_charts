import { Response } from "express";
import Song from '../models/song_model';

const createSongResponse = (result: any) => {
  const songs: Song = result.map((row: any) => ({
    title: row.title,
    releaseYear: new Date(row.releaseYear).getFullYear(),
    genres: row.genres ? row.genres.split(",") : [],
    artists: row.artists ? row.artists.split(",") : [],
  }));
    return songs;
};

const sendResponse = (res: Response, data:any) => {
    res.json(data)
}

export { createSongResponse, sendResponse }