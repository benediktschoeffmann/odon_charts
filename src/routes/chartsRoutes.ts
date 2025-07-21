import { Router } from "express";
import dbpool from "../../config/database";
import sendErrorResponse from "../responses/errorResponse";
import countryCodes from "../../config/countryCodes";
import { getAllChartsController } from "../controllers/chartsController";

const router: Router = require("express").Router();
const baseUrl: string = "/api/charts";

const generalChartRoute = (
  url: string,
  controller: any,
  searchParaDesc?: string,
  ifStatement?: (para: any) => boolean
) => {
  router.get(baseUrl + url, (req, res) => {
      
    let searchPara: string | number | undefined = undefined;
    if (searchParaDesc) {
      if (!req.params[searchParaDesc] || req.params[searchParaDesc] === null) {
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
    })
};

generalChartRoute("", getAllChartsController);

module.exports = router;