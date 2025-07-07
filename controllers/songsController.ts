import Song from "../models/songModel";
import dbpool from "../config/databaseconfig";

const getAllSongs = (dbpool) => {
  dbpool.getConnection().then((conn) => {
    conn.query();
  });
};
