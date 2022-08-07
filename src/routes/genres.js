import express from "express";
const router = express.Router();

const genresController = require("../controllers/GenresController");

router.get("/:slug", genresController.show);

module.exports = router;
