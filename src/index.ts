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

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});

export default app;
