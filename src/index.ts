import express, { Application, Request, Response} from "express";

import dbpool from "../config/databaseconfig";
import sendErrorResponse from '../Messages/Messages';

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
        sendErrorResponse(res, 500, err)
      })
      .finally(() => {
        conn.end();
    })
  );
});

app.get("/api/song/title/:title", (req, res) => {
  const songTitle = req.params.title as string;

  if (!songTitle) {
    sendErrorResponse(res, 400);
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
          sendErrorResponse(res, 404);
        }
      })
      .catch((err) => {
        sendErrorResponse(res, 500, err)
      })
      .finally(() => {
        conn.end();
      })
  );
});

app.get("/api/songs/year/:releaseYear", (req, res) => {
  const releaseYear = parseInt(req.params.releaseYear, 10);

  if (!Number.isInteger(releaseYear) || ! releaseYear) {
    sendErrorResponse(res, 400)
  } 

  dbpool.getConnection().then((conn) =>
    conn
      .query("SELECT title, releaseYear FROM `songs` WHERE  `releaseYear` BETWEEN ? AND ?;",
        [`${releaseYear}-01-01`, `${releaseYear}-12-31`,])
      .then((result) => {
        if (result.length > 0) {
          res.json(result);
        } else {
          sendErrorResponse(res, 404)
        }
      })
      .catch((err) => {
        sendErrorResponse(res, 500, err)
      })
      .finally(() => {
        conn.end();
      })
  );
})

app.get("/api/songs/betweenYear/:firstYear/:lastYear", (req, res) => {
  const firstYear = parseInt(req.params.firstYear, 10);
  const lastYear = parseInt(req.params.lastYear, 10);

  if (!firstYear || !lastYear || !Number.isInteger(firstYear) || !Number.isInteger(lastYear)) {
    sendErrorResponse(res, 400)
  }


  dbpool.getConnection().then((conn) =>
    conn
      .query("SELECT title, releaseYear FROM `songs` WHERE `releaseYear` BETWEEN ? AND ?;", [
        `${firstYear}-01-01`,
        `${lastYear}-12-31`,
      ])
      .then((result) => {
        if (result.length > 0) {
          res.json(result);
        } else {
          sendErrorResponse(res, 404)
        }
      })
      .catch((err) => {
        sendErrorResponse(res, 500, err)
      })
      .finally(() => {
        conn.end();
      })
  );
});

app.get("/api/songs/artist/:artistName", (req, res) => {
  const artistName = req.params.artistName as string;

  if (!artistName) {
    sendErrorResponse(res, 400)
  }

  dbpool.getConnection().then((conn) => {
      conn
        .query(
          "SELECT title, releaseYear FROM `songs` " +
            "INNER JOIN songs_artists ON songs.ID = songs_artists.songID " +
            "INNER JOIN artists ON songs_artists.artistID = artists.ID " +
            "WHERE LOWER(artists.name) = LOWER(?);",
          [artistName]
        )
        .then((result) => {
          if (result.length > 0) {
            console.log("there are some results");
            res.json(result);
          } else {
            sendErrorResponse(res, 404)
          }
        })
        .catch((err) => {
          sendErrorResponse(res, 500, err)
        })
        .finally(() => {
          conn.end();
        });
  });
});

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
