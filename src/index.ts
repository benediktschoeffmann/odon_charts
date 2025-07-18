import express, { Application, Request, Response } from "express";

import dbpool from "../config/database";
import sendErrorResponse from "./Responses/ErrorResponse";
import {
  getSongsBetweenYearController,
} from "./controllers/songsController";


const PORT = process.env.PORT || 9000;

const app: Application = express();
const songsRouter = require("./routes/songsRoutes");
import limiter from "../config/rateLimiter";

app.use(songsRouter);
app.use("/api/", limiter);

//////////////////////SONGS///////////////////////////////////////

//app.get("/api/songs/year/:releaseYear", (req, res) => {
//  const releaseYear = parseInt(req.params.releaseYear, 10);
//
//  if (!Number.isInteger(releaseYear) || !releaseYear) {
//    sendErrorResponse(res, 400);
//    return;
//  }
//
//  getSongsFromYearController(res, dbpool, releaseYear);
//});

app.get("/api/songs/betweenYear/:firstYear/:lastYear", (req, res) => {
  const firstYear = parseInt(req.params.firstYear, 10);
  const lastYear = parseInt(req.params.lastYear, 10);

  if (
    !firstYear ||
    !lastYear ||
    !Number.isInteger(firstYear) ||
    !Number.isInteger(lastYear)
  ) {
    sendErrorResponse(res, 400);
    return;
  }

  getSongsBetweenYearController(res, dbpool, firstYear, lastYear);
});

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});

export default app;
