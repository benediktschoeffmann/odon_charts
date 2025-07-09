import {Router} from "express";
import dbpool from "../config/databaseconfig";
import { getAllSongsController } from "../controllers/songsController";

const router: Router = require("express").Router();
const baseUrl: string = "/api/songs";

router.get(baseUrl, (_req, res) => {
  getAllSongsController(res, dbpool);
});

module.exports = router;
