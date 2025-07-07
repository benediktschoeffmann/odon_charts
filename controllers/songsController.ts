import Song from "../models/song_model";
import dbpool from '../config/databaseconfig';

const getAllSongs =(dbpool) => {
    dbpool.getConnection().then((conn) => {
        conn.query()
    })
}