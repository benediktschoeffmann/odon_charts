import express, { Application } from "express";

import dbpool from "../config/databaseconfig";

const PORT = process.env.PORT || 9000;

const app: Application = express();

app.get("/ping", async (_req, res) => {
  res.send({
    message: "pong",
  });
});

app.get("/api/songs", (_req, res, next) => {
  console.log("trying to connect")
  dbpool.getConnection().then((conn) =>
    conn
      .query("SELECT * FROM songs")
      .then((result) => {
        res.json(result);
    })
      .catch((err) => {
        res.status(500).json({
          message: "Error Code 500"
        })
      })
  );
});

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
