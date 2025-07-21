import { Router } from "express";
import dbpool from "../../config/database";
import sendErrorResponse from "../responses/errorResponse";
import countryCodes from "../../config/countryCodes";
import { getAllChartsController, getChartsFromArtistController, getChartsFromChartYearController, getChartsFromGenreController, getChartsFromNationalityController, getChartsFromReleaseYearController, getChartsFromTitleController } from "../controllers/chartsController";

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
};;

generalChartRoute("", getAllChartsController);

generalChartRoute("/title", getChartsFromTitleController, "title");
generalChartRoute("/releaseYear", getChartsFromReleaseYearController, "releaseYear");
generalChartRoute("/artist", getChartsFromArtistController, "artist");
generalChartRoute("/genre", getChartsFromGenreController, "genre");
generalChartRoute("/nationality", getChartsFromNationalityController, "nationality");
generalChartRoute("/chartYear", getChartsFromChartYearController, "chartYear");

router.use(baseUrl, (req, res) => {
  res.status(400).json({
    message: "Parameter isn't set",
  });
});

module.exports = router;