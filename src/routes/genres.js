import express from "express";
const router = express.Router();

const genresController = require("../controllers/GenresController");

router.get("/:slugGenres", genresController.show);
router.get("/:slugGenres/:nameBook", genresController.display);

module.exports = router;
