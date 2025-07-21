import express, { Application, Request, Response } from "express";
import "dotenv/config"
const PORT = process.env.PORT || 9000;

const app: Application = express();
const songsRouter = require("./routes/songsRoutes");
const chartRouter = require("./routes/chartsRoutes");
import limiter from "../config/rateLimiter";
import { weekNumber } from "weeknumber";

app.use(chartRouter);
app.use(songsRouter);
app.use("/api/", limiter);

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});

export default app;