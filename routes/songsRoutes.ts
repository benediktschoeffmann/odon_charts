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

router.get(baseUrl, (_req, res) => {
  getAllSongsController(res, dbpool);
});

router.get(baseUrl + "/title/:title", (req, res) => {
    const songTitle = decodeURIComponent(req.params.title) as string;

    if (!songTitle) {
      sendErrorResponse(res, 400);
      return;
    }

    getSongsFromTitleController(res, dbpool, songTitle);
});

module.exports = router;