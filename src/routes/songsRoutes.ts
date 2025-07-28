import { Router } from "express";
import dbpool from "../../config/database";
import sendErrorResponse from "../responses/errorResponse";
import countryCodes from "../../config/countryCodes";
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

const generalSongRoute = (
  url: string,
  controller: any,
  searchParaDesc?: string,
  ifStatement?: (para: any) => boolean
) => {
  router.get(
    baseUrl + url + (searchParaDesc ? "/:" + searchParaDesc : ""),
    (req, res) => {
      let searchPara: string | number | undefined = undefined;
      if (searchParaDesc) {
        if (
          !req.params[searchParaDesc] ||
          req.params[searchParaDesc] === null
        ) {
          sendErrorResponse(res, 400);
          return;
        }
        searchPara = decodeURI(req.params[searchParaDesc]);
        if (!isNaN(+searchPara)) {
          searchPara = Number(searchPara);
        }
        if (ifStatement && ifStatement(searchPara)) {
          sendErrorResponse(res, 400);
          return;
        }
      }

      controller(res, dbpool, searchPara && searchPara);
    }
  );
};

generalSongRoute("", getAllSongsController);
generalSongRoute("/title", getSongsFromTitleController, "title", (para) => {
  const paraString: string = para.toString();
  return paraString.length > 100;
});
generalSongRoute("/year", getSongsFromYearController, "year", (para) => {
  const currentYear = new Date().getFullYear();
  return !Number.isInteger(para) || 500 > para || para > currentYear;
});
generalSongRoute("/artist", getSongsFromArtistController, "artist");
generalSongRoute("/genre", getSongsFromGenreController, "genre");
generalSongRoute(
  "/nationality",
  getSongsFromNationalityController,
  "nationality",
  (para) => {
    return !para || para.length != 2 || !countryCodes.includes(para);
  }
);

router.get("/api/songs/betweenYear/:firstYear/:lastYear", (req, res) => {
  const firstYear = parseInt(req.params.firstYear, 10);
  const lastYear = parseInt(req.params.lastYear, 10);
  const currentYear = new Date().getFullYear();
  if (
    !firstYear ||
    !lastYear ||
    !Number.isInteger(firstYear) ||
    !Number.isInteger(lastYear) ||
    500 > firstYear ||
    500 > lastYear ||
    firstYear > currentYear ||
    lastYear > currentYear ||
    lastYear < firstYear
  ) {
    sendErrorResponse(res, 400);
    return;
  }

  getSongsBetweenYearController(res, dbpool, firstYear, lastYear);
});

router.use(baseUrl, (req, res) => {
  res.status(400).json({
    message: "Parameter isn't set",
  });
});

router.use("/", (req, res) => {
  res.status(404).json({
    message: "Endpoint not found",
  });
});

module.exports = router;
