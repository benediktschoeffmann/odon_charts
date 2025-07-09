import {Router} from "express";
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

const router: Router = require("express").Router();
const baseUrl: string = "/api/songs";

const generalSongRoute = (url: string, controller: any, searchParaDesc?: string, ifStatement?: (para: any) => boolean) => {
    router.get(baseUrl + url, (req, res) => {
      let searchPara: any | undefined = undefined;
      if (searchParaDesc) {
          searchPara = decodeURI(req.params[searchParaDesc]);
        if (ifStatement && ifStatement(searchPara)) {
          sendErrorResponse(res, 400);
          return;
        }
      }

      controller(res, dbpool, searchPara && searchPara);
    });
}

generalSongRoute("", getAllSongsController);
generalSongRoute("/title/:title", getSongsFromTitleController, "title", (params) => {
    return !params
})
generalSongRoute("/api/songs/year/:year", getSongsFromYearController, "year", (para) => {
    return !para || !Number.isInteger(para)
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

module.exports = router;