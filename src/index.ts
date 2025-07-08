import express, { Application, Request, Response } from "express";

import dbpool from "../config/databaseconfig";
import sendErrorResponse from "../Responses/ErrorResponse";
import Song from "../models/songModel";
import { createSongResponse, sendSongResponse } from "../Responses/SongResponse";
import {getAllSongsController, getSongsBetweenYearController, getSongsFromTitleController, getSongsFromYearController} from "../controllers/songsController"

const PORT = process.env.PORT || 9000;

const app: Application = express();

app.get("/ping", async (_req, res) => {
  res.send({
    message: "pong",
  });
});

//////////////////////SONGS///////////////////////////////////////
app.get("/api/songs", (_req, res, next) => {
  getAllSongsController(res, dbpool);
});

app.get("/api/songs/title/:title", (req, res) => {
  const songTitle = decodeURIComponent(req.params.title) as string;

  if (!songTitle) {
    sendErrorResponse(res, 400);
    return;
  }

  getSongsFromTitleController(res, dbpool, songTitle)
});

app.get("/api/songs/year/:releaseYear", (req, res) => {
  const releaseYear = parseInt(req.params.releaseYear, 10);

  if (!Number.isInteger(releaseYear) || !releaseYear) {
    sendErrorResponse(res, 400);
    return;
  }

  getSongsFromYearController(res, dbpool, releaseYear)
});

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

  getSongsBetweenYearController(res, dbpool, firstYear, lastYear)
});

app.get("/api/songs/artist/:artistName", (req, res) => {
  const artistName = decodeURIComponent(req.params.artistName) as string;

  if (!artistName) {
    sendErrorResponse(res, 400);
    return;
  }

  dbpool
    .getConnection()
    .then((conn) => {
      conn
        .query(
          "SELECT DISTINCT title, releaseYear FROM `songs` " +
            "INNER JOIN songs_artists ON songs.ID = songs_artists.songID " +
            "INNER JOIN artists ON songs_artists.artistID = artists.ID " +
            "WHERE LOWER(artists.name) = LOWER(?);",
          [artistName]
        )
        .then((result) => {
          if (result.length > 0) {
            res.json(result);
          } else {
            sendErrorResponse(res, 404);
          }
        })
        .catch((err) => {
          sendErrorResponse(res, 500, err);
        })
        .finally(() => {
          conn.end();
        });
    })
    .catch((err) => {
      sendErrorResponse(res, 500, err);
    });
});

app.get("/api/songs/genre/:genre", (req, res) => {
  const songGenre = decodeURIComponent(req.params.genre) as string;

  if (!songGenre) {
    sendErrorResponse(res, 400);
    return;
  }

  dbpool
    .getConnection()
    .then((conn) => {
      conn
        .query(
          "SELECT DISTINCT title, releaseYear FROM `songs` " +
            "INNER JOIN songs_genres ON songs.ID = songs_genres.songID " +
            "INNER JOIN genres ON songs_genres.genreID = genres.ID " +
            "WHERE LOWER(genres.description) = LOWER(?);",
          [songGenre]
        )
        .then((result) => {
          if (result.length > 0) {
            res.json(result);
          } else {
            sendErrorResponse(res, 404);
          }
        })
        .catch((err) => {
          sendErrorResponse(res, 500, err);
        })
        .finally(() => {
          conn.end();
        });
    })
    .catch((err) => {
      sendErrorResponse(res, 500, err);
    });
});

app.get("/api/songs/nationality/:nationality", (req, res) => {
  const nationality = req.params.nationality as string;

  if (!nationality || nationality.length > 2) {
    sendErrorResponse(res, 400);
    return;
  }

  dbpool
    .getConnection()
    .then((conn) => {
      conn
        .query(
          "SELECT DISTINCT songs.title, songs.releaseYear FROM songs " +
            "INNER JOIN songs_artists ON songs.ID = songs_artists.songID " +
            "INNER JOIN artists ON songs_artists.artistID = artists.ID " +
            "INNER JOIN nationalities ON artists.nationalityID = nationalities.ID " +
            "WHERE LOWER(nationalities.description) = LOWER(?);",
          [nationality]
        )
        .then((result) => {
          if (result.length > 0) {
            res.status(200).json(result);
            res.json(result);
          } else {
            sendErrorResponse(res, 404);
          }
        })
        .catch((err) => {
          sendErrorResponse(res, 500, err);
        })
        .finally(() => {
          conn.end();
        });
    })
    .catch((err) => {
      sendErrorResponse(res, 500, err);
    });
});

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
