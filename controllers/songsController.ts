import Song from "../models/songModel";
import { Pool } from "mariadb/*";
import sendErrorResponse from "../Responses/ErrorResponse";
import { createSongResponse, sendSongResponse } from "../Responses/SongResponse";
import { Response } from "express";


const generalSongController = (
  res: Response,
  dbpool: Pool,
  query: string,
  searchPara?
) => {
  dbpool
    .getConnection()
    .then((conn) => {
      conn
        .query(query, searchPara && [searchPara])
        .then((result) => {
          if (result.length > 0) {
            console.log(result);
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
        });
    })
    .catch((err) => {
      sendErrorResponse(res, 500, err);
    });
};
