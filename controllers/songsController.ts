import Song from "../models/songModel";
import { Pool } from "mariadb/*";
import sendErrorResponse from "../Responses/ErrorResponse";
import { createSongResponse, sendSongResponse } from "../Responses/SongResponse";
import { Response } from "express";
import dbpool from '../config/databaseconfig';


const generalSongController = (
  res: Response,
  dbpool: Pool,
  query: string,
  searchPara?: (string | number)[]
) => {
  dbpool
    .getConnection()
    .then((conn) => {
      conn
        .query(query, searchPara && searchPara)
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
          return
        });
    })
    .catch((err) => {
      sendErrorResponse(res, 500, err);
    });
};

const getAllSongsController = (res: Response, dbpool: Pool) => {
  generalSongController(
    res,
    dbpool,
    "SELECT songs.ID, songs.title, songs.releaseYear, " +
      "GROUP_CONCAT(DISTINCT artists.name) as artists, " +
      "GROUP_CONCAT(DISTINCT genres.description) as genres FROM songs " +
      "INNER JOIN songs_artists ON songs.ID = songs_artists.songID " +
      "INNER JOIN artists ON songs_artists.artistID = artists.ID " +
      "INNER JOIN songs_genres songs_genres ON songs.ID = songs_genres.songID " +
      "INNER JOIN genres genres ON songs_genres.genreID = genres.ID " +
      "GROUP BY songs.title;"
  );
};

const getSongsFromTitleController = (res: Response, dbpool: Pool, songTitle: string) => {
  generalSongController(
    res,
    dbpool,
    "SELECT songs.title, songs.releaseYear, " +
      "GROUP_CONCAT(DISTINCT artists.name) as artists, " +
      "GROUP_CONCAT(DISTINCT genres.description) as genres FROM songs " +
      "INNER JOIN songs_artists ON songs.ID = songs_artists.songID " +
      "INNER JOIN artists ON songs_artists.artistID = artists.ID " +
      "INNER JOIN songs_genres songs_genres ON songs.ID = songs_genres.songID " +
      "INNER JOIN genres genres ON songs_genres.genreID = genres.ID " +
      "WHERE LOWER(songs.title) = LOWER(?) " +
      "GROUP BY songs.title;",
    [songTitle]
  );
};

const getSongsBetweenYearController = (res: Response, dbpool: Pool, firstYear: number, lastYear: number) => {
  generalSongController(
    res,
    dbpool,
    "SELECT songs.title, songs.releaseYear, " +
      "GROUP_CONCAT(DISTINCT artists.name) as artists, " +
      "GROUP_CONCAT(DISTINCT genres.description) as genres FROM songs " +
      "INNER JOIN songs_artists ON songs.ID = songs_artists.songID " +
      "INNER JOIN artists ON songs_artists.artistID = artists.ID " +
      "INNER JOIN songs_genres songs_genres ON songs.ID = songs_genres.songID " +
      "INNER JOIN genres genres ON songs_genres.genreID = genres.ID " +
      "WHERE  `releaseYear` BETWEEN ? AND ? " +
      "GROUP BY songs.title;",
    [`${firstYear}-01-01`, `${lastYear}-12-31`]
  );
}

const getSongsFromYearController = (res: Response, dbpool: Pool, releaseYear: number
) => {
  getSongsBetweenYearController(res, dbpool, releaseYear, releaseYear)
};



export { getAllSongsController, getSongsFromTitleController, getSongsFromYearController, getSongsBetweenYearController};