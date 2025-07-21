import { Pool } from "mariadb/*";
import sendErrorResponse from "../responses/errorResponse";
import {
  createChartResponse,
  sendChartResponse,
} from "../responses/chartResponse";
import { Response } from "express";

const generalChartController = (
  res: Response,
  dbpool: Pool,
  whereStatement: string,
  searchPara?: (string | number)[]
) => {
  dbpool
    .getConnection()
    .then((conn) => {
      conn
        .query(
          "SELECT charts.year AS chartYear, charts.week AS chartWeek, " +
            "songs.title AS title, songs.releaseYear AS releaseYear, " +
            "GROUP_CONCAT( DISTINCT CONCAT(artists.name, ' (', nationalities.description, ')') ORDER BY artists.name ) as artistsWithNationalities," +
            "GROUP_CONCAT(DISTINCT genres.description) as genres FROM charts " +
            "INNER JOIN songs ON charts.songID = songs.ID " +
            "INNER JOIN songs_artists ON songs.ID = songs_artists.songID " +
            "INNER JOIN artists ON songs_artists.artistID = artists.ID " +
            "INNER JOIN songs_genres songs_genres ON songs.ID = songs_genres.songID " +
            "INNER JOIN genres genres ON songs_genres.genreID = genres.ID " +
            "INNER JOIN nationalities ON artists.nationalityID = nationalities.ID " +
            whereStatement +
            " GROUP BY charts.year, charts.week;",
          searchPara && searchPara
        )
        .then((result) => {
          if (result.length > 0) {
            const chart = createChartResponse(result);
            sendChartResponse(res, chart);
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

const getAllChartsController = (res: Response, dbpool: Pool) => {
  generalChartController(res, dbpool, "");
};

const getChartsFromTitleController = (res: Response,dbpool: Pool,songTitle: string) => {
  generalChartController(res, dbpool, "WHERE LOWER (songs.title) = LOWER (?)", [
    songTitle,
  ]);
};

const getChartsFromReleaseYearController = (res: Response,dbpool: Pool,releaseYear: number) => {
  generalChartController(
    res,
    dbpool,
    "WHERE songs.releaseYear BETWEEN ? AND ?",
    [`${releaseYear}-01-01`, `${releaseYear}-12-31`]
  );
};

const getChartsFromArtistController = (res: Response,dbpool: Pool,artistName: string) => {
  generalChartController(
    res,
    dbpool,
    "WHERE songs.ID IN (SELECT songs_artists.songID FROM songs_artists INNER JOIN artists ON songs_artists.artistID = artists.ID WHERE LOWER(artists.name) = LOWER(?))",
    [artistName]
  );
};

const getChartsFromGenreController = (res: Response, dbpool: Pool, genre: string) => {
  generalChartController(
    res,
    dbpool,
    "WHERE songs.ID IN (SELECT songs_genres.songID FROM songs_genres INNER JOIN genres ON songs_genres.genreID = genres.ID WHERE LOWER(genres.description) = LOWER(?))",
    [genre]
  );
};

const getChartsFromNationalityController = (res: Response, dbpool: Pool, nationality: string) => {
  generalChartController(
    res,
    dbpool,
    "WHERE songs.ID IN (SELECT songs_artists.songID FROM songs_artists INNER JOIN artists ON songs_artists.artistID = artists.ID INNER JOIN nationalities ON artists.nationalityID = nationalities.ID WHERE LOWER(nationalities.description) = LOWER(?))",
    [nationality]
  );
}

const getChartsFromChartYearController = (res: Response, dbpool: Pool, chartYear: number) => {
  generalChartController(res, dbpool, " WHERE charts.year = ?", [chartYear]);
}

const getChartsFromChartYearWeekController = (res: Response, dbpool: Pool, chartYear: number, chartWeek: number) => {
  generalChartController(
    res,
    dbpool,
    " WHERE charts.year = ? AND charts.week = ? ",
    [chartYear, chartWeek]
  );
}

export {
  getAllChartsController,
  getChartsFromArtistController,
  getChartsFromChartYearController,
  getChartsFromChartYearWeekController,
  getChartsFromGenreController,
  getChartsFromNationalityController,
  getChartsFromReleaseYearController,
  getChartsFromTitleController,
};