const express = require("express");
const router = express.Router();
const movieController = require("../controllers/movieController");

router.get("/", movieController.getAllMovies);
router.post("/", movieController.createMovie);
router.get("/:id", movieController.getMovieById);
router.put("/:id", movieController.updateMovieById);
router.get("/movies/:id/reviews", movieController.getAllReviewsForMovie); //hämta för en specifik film
router.delete("/movies/:id", movieController.deleteMovieById);

module.exports = router;
