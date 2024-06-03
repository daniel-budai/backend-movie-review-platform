const express = require("express");
const router = express.Router();
const movieController = require("../controllers/movieController");

router.post("/", movieController.addMovie);
router.get("/", movieController.getAllMovies);
router.get("/:id", movieController.getMovieById);
router.put("/movies/:id", movieController.updateMovieById);
router.get("/movies/:id/reviews", movieController.getMovieReviews);
//router.get("/ratings"); // Hämta en lista med alla filmer och deras genomsnittliga betyg. aggregate

module.exports = router;
