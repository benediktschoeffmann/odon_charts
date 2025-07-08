import Song from "../models/songModel";
import { Pool } from "mariadb/*";
import sendErrorResponse from "../Responses/ErrorResponse";
import { createSongResponse, sendSongResponse } from "../Responses/SongResponse";
import { Response } from "express";
import dbpool from '../config/databaseconfig';

const generalSongController = (
  res: Response,
  dbpool: Pool,
  searchStatement: string,
  searchPara?: (string | number)[]
) => {
  dbpool
    .getConnection()
    .then((conn) => {
      conn
        .query(
          "SELECT songs.title, songs.releaseYear, " +
            "GROUP_CONCAT(DISTINCT artists.name) as artists, " +
            "GROUP_CONCAT(DISTINCT genres.description) as genres FROM songs " +
            "INNER JOIN songs_artists ON songs.ID = songs_artists.songID " +
            "INNER JOIN artists ON songs_artists.artistID = artists.ID " +
            "INNER JOIN songs_genres songs_genres ON songs.ID = songs_genres.songID " +
            "INNER JOIN genres genres ON songs_genres.genreID = genres.ID " +
            searchStatement +
            " GROUP BY songs.title;",
          searchPara && searchPara
        )
        .then((result) => {
          if (result.length > 0) {
            const songs = createSongResponse(result);
            sendSongResponse(res, songs);
          } else {
            sendErrorResponse(res, 404);
          }
        })
        .catch((err) => {
          sendErrorResponse(res, 500, err);
        })
        .finally(() => {
          conn.end();
          return;
        });
    })
    .catch((err) => {
      sendErrorResponse(res, 500, err);
    });
};

const getAllSongsController = (res: Response, dbpool: Pool) => {
  generalSongController(res, dbpool, "");
};

const getSongsFromTitleController = (res: Response, dbpool: Pool, songTitle: string) => {
  generalSongController(res, dbpool, "WHERE LOWER(songs.title) = LOWER(?) ", [songTitle]);
};

const getSongsBetweenYearController = (res: Response, dbpool: Pool, firstYear: number, lastYear: number) => {
  generalSongController(res, dbpool, "WHERE  `releaseYear` BETWEEN ? AND ? ",
    [`${firstYear}-01-01`, `${lastYear}-12-31`]);
};

const getSongsFromYearController = (res: Response, dbpool: Pool, releaseYear: number) => {
  getSongsBetweenYearController(res, dbpool, releaseYear, releaseYear);
};

const getSongsFromArtistController = (res: Response, dbpool: Pool, artistName: string) => {
  generalSongController(res, dbpool, "WHERE LOWER(artists.name) = LOWER(?) ", [artistName]);
}

const getSongsFromGenreController = (res: Response, dbpool: Pool, genre: string) => {
  generalSongController(res, dbpool, "WHERE LOWER(genres.description) = LOWER(?) ", [genre])
}

export {
  getAllSongsController,
  getSongsFromTitleController,
  getSongsFromYearController,
  getSongsBetweenYearController,
  getSongsFromArtistController,
  getSongsFromGenreController
};
