const express = require("express");
const router = express.Router();
const movieController = require("../controllers/movieController");
const { isAdmin, authenticate } = require("../middlewares/auth");

router.post("/", authenticate, isAdmin, movieController.addMovie);
router.get("/", movieController.getAllMovies);
router.get("/ratings", movieController.averageRating);
router.get("/:id", movieController.getMovieById);
router.put("/:id", authenticate, isAdmin, movieController.updateMovieById);
router.get("/movies/:id/reviews", movieController.getMovieReviews);
router.delete("/:id", authenticate, isAdmin, movieController.deleteMovieById);

module.exports = router;
