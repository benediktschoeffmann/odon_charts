import { Router } from "express";
import dbpool from "../../config/database";
import sendErrorResponse from "../responses/errorResponse";
import countryCodes from "../../config/countryCodes";
import {
  getAllChartsController,
  getChartsFromArtistController,
  getChartsFromChartYearController,
  getChartsFromGenreController,
  getChartsFromNationalityController,
  getChartsFromReleaseYearController,
  getChartsFromTitleController,
  getChartsFromChartYearWeekController,
} from "../controllers/chartsController";

const router: Router = require("express").Router();
const baseUrl: string = "/api/charts";

const generalChartRoute = (
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

generalChartRoute("", getAllChartsController);

generalChartRoute("/title", getChartsFromTitleController, "title");
generalChartRoute(
  "/releaseYear",
  getChartsFromReleaseYearController,
  "releaseYear"
);
generalChartRoute("/artist", getChartsFromArtistController, "artist");
generalChartRoute("/genre", getChartsFromGenreController, "genre");
generalChartRoute("/nationality", getChartsFromNationalityController, "nationality");
generalChartRoute("/chartYear", getChartsFromChartYearController, "chartYear");

router.get(
  baseUrl + "/chartYear/:chartYear/chartWeek/:chartWeek",
  (req, res) => {
    const chartYear = parseInt(req.params.chartYear, 10);
    const chartWeek = parseInt(req.params.chartWeek, 10);
    const currentYear = new Date().getFullYear();
    if (
      !chartYear ||
      !chartWeek ||
      !Number.isInteger(chartYear) ||
      !Number.isInteger(chartWeek) ||
      chartYear < 1900 ||
      chartYear > currentYear ||
      chartWeek > 53 ||
      chartWeek < 1
    ) {
      sendErrorResponse(res, 400);
      return;
    }

    getChartsFromChartYearWeekController(res, dbpool, chartYear, chartWeek);
  }
);

router.use(baseUrl, (req, res) => {
  res.status(400).json({
    message: "Parameter isn't set",
  });
});

module.exports = router;
