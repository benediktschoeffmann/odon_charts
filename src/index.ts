import express, { Application, Request, Response} from "express";

import dbpool from "../config/databaseconfig";

const PORT = process.env.PORT || 9000;

const app: Application = express();

app.get("/ping", async (_req, res) => {
  res.send({
    message: "pong",
  });
});

//////////////////////SONGS///////////////////////////////////////
app.get("/api/songs", (_req, res, next) => {
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
      .finally(() => {
        conn.end();
    })
  );
});

app.get("/api/song", (req, res) => {
  const songTitle = req.query.title as string;

  if (!songTitle) {
     res.status(400).json({
      message: "Valid Title parameter required",
     });
    return;
  }

  dbpool.getConnection().then((conn) =>
    conn
      .query(
        "SELECT title, releaseYear FROM songs WHERE LOWER(title) = LOWER(?)",
        [songTitle]
      )
      .then((result) => {
        if (result.length > 0) {
          res.json(result);
        } else {
          res.status(404).json({
            message: "Song not found",
          });
        }
      })
      .catch((err) => {
        res.status(500).json({
          message: "Internal server error",
        });
      })
      .finally(() => {
        conn.end();
      })
  );
});

app.get("/api/songs/year/:releaseYear", (req, res) => {
  const releaseYear = parseInt(req.params.releaseYear, 10);

  if (!Number.isInteger(releaseYear) || ! releaseYear) {
    res.status(400).json({
      message: "Valid parameter required",
    });
    return;
  } 

  dbpool.getConnection().then((conn) =>
    conn
      .query("SELECT * FROM `songs` WHERE `releaseYear` BETWEEN ? AND ?;",
        [`${releaseYear}-01-01`, `${releaseYear}-12-31`,])
      .then((result) => {
        if (result.length > 0) {
          res.json(result);
        } else {
          res.status(404).json({
            message: "Song not found",
          });
        }
      })
      .catch((err) => {
        res.status(500).json({
          message: "Internal server error",
        });
      })
      .finally(() => {
        conn.end();
      })
  );
})

app.get("/api/songs/betweenYear/:firstYear/:lastYear", (req, res) => {
  const firstYear = parseInt(req.params.firstYear, 10);
  const lastYear = parseInt(req.params.lastYear, 10)

  if (!firstYear || !lastYear || !Number.isInteger(firstYear) || !Number.isInteger(lastYear)) {
    res.status(400).json({
      message: "Valid parameter required",
    });
    return;
  }


  dbpool.getConnection().then((conn) =>
    conn
      .query("SELECT * FROM `songs` WHERE `releaseYear` BETWEEN ? AND ?;", [
        `${firstYear}-01-01`,
        `${lastYear}-12-31`,
      ])
      .then((result) => {
        if (result.length > 0) {
          res.json(result);
        } else {
          res.status(404).json({
            message: "Song not found",
          });
        }
      })
      .catch((err) => {
        res.status(500).json({
          message: "Internal server error",
        });
      })
      .finally(() => {
        conn.end();
      })
  );
});

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
