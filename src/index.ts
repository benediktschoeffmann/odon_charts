import express, { Application, Request, Response } from "express";

import dbpool from "../config/databaseconfig";
import sendErrorResponse from "../Responses/ErrorResponse";
import {
  getAllSongsController,
  getSongsBetweenYearController,
  getSongsFromArtistController,
  getSongsFromGenreController,
  getSongsFromNationalityController,
  getSongsFromTitleController,
  getSongsFromYearController,
} from "../controllers/songsController";

const PORT = process.env.PORT || 9000;

const app: Application = express();
const songsRouter = require("../routes/songsRoutes")

app.use(songsRouter);

//////////////////////SONGS///////////////////////////////////////


//app.get("/api/songs/year/:releaseYear", (req, res) => {
//  const releaseYear = parseInt(req.params.releaseYear, 10);
//
//  if (!Number.isInteger(releaseYear) || !releaseYear) {
//    sendErrorResponse(res, 400);
//    return;
//  }
//
//  getSongsFromYearController(res, dbpool, releaseYear);
//});

app.get("/api/songs/betweenYear/:firstYear/:lastYear", (req, res) => {
  const firstYear = parseInt(req.params.firstYear, 10);
  const lastYear = parseInt(req.params.lastYear, 10);

  if (
    !firstYear ||
    !lastYear ||
    !Number.isInteger(firstYear) ||
    !Number.isInteger(lastYear)
  ) {
    sendErrorResponse(res, 400);
    return;
  }

  getSongsBetweenYearController(res, dbpool, firstYear, lastYear);
});

app.get("/api/songs/artist/:artistName", (req, res) => {
  const artistName = decodeURIComponent(req.params.artistName) as string;

  if (!artistName) {
    sendErrorResponse(res, 400);
    return;
  }

  getSongsFromArtistController(res, dbpool, artistName);
});

app.get("/api/songs/genre/:genre", (req, res) => {
  const songGenre = decodeURIComponent(req.params.genre) as string;

  if (!songGenre) {
    sendErrorResponse(res, 400);
    return;
  }

  getSongsFromGenreController(res, dbpool, songGenre);
});

app.get("/api/songs/nationality/:nationality", (req, res) => {
  const nationality = req.params.nationality as string;

  if (!nationality || nationality.length > 2) {
    sendErrorResponse(res, 400);
    return;
  }

  getSongsFromNationalityController(res, dbpool, nationality);
});

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});

export default app;
