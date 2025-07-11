import {Router} from "express";
import dbpool from "../config/databaseconfig";
import sendErrorResponse from "../Responses/ErrorResponse";
import countryCodes from '../data/countryCodes';
import {
  getAllSongsController,
  getSongsBetweenYearController,
  getSongsFromArtistController,
  getSongsFromGenreController,
  getSongsFromNationalityController,
  getSongsFromTitleController,
  getSongsFromYearController,
} from "../controllers/songsController";

const router: Router = require("express").Router();
const baseUrl: string = "/api/songs";

const generalSongRoute = (url: string, controller: any, searchParaDesc?: string, ifStatement?: (para: any) => boolean) => {
    router.get(baseUrl + url, (req, res) => {
      let searchPara: string | number | undefined = undefined;
      if (searchParaDesc) {
        if (!req.params[searchParaDesc]) {
          sendErrorResponse(res, 400);
          return
        }
          searchPara = decodeURI(req.params[searchParaDesc]);
          if (!isNaN(+searchPara)) {
              searchPara = Number(searchPara)
          }
        if (ifStatement && ifStatement(searchPara)) {
          sendErrorResponse(res, 400);
          return;
        }
      }

      controller(res, dbpool, searchPara && searchPara);
    });
}

generalSongRoute("", getAllSongsController);
generalSongRoute("/title/:title", getSongsFromTitleController, "title")
generalSongRoute("/year/:year", getSongsFromYearController, "year", (para) => {
    return (!Number.isInteger(para))
});
generalSongRoute("/artist/:artist", getSongsFromArtistController, "artist");
generalSongRoute("/genre/:genre", getSongsFromGenreController, "genre");
generalSongRoute("/nationality/:nationality", getSongsFromNationalityController, "nationality", (para) => {
  return (!para || para.length > 2 || !countryCodes.includes(para))
});

//router.get(baseUrl + "/title/:title", (req, res) => {
//  const songTitle = decodeURIComponent(req.params.title) as string;
//
//  if (!songTitle) {
//    sendErrorResponse(res, 400);
//    return;
//  }
//
//  getSongsFromTitleController(res, dbpool, songTitle);
//});

router.use(baseUrl, (req, res) => {
  res.status(404).json({
    message: "Endpoint not found",
  });
});

module.exports = router;