const Movie = require("../models/Movie");
const Review = require("../models/Review");

const addMovie = async (req, res) => {
  const { title, director, releaseYear, genre } = req.body;

  try {
    const addedMovie = new Movie({
      title,
      director,
      releaseYear,
      genre,
    });

    await addedMovie.save();

    res.status(201).json(addedMovie);
  } catch (error) {
    res.status(500).json({ error: "There was a server error." });
  }
};

const getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ error: "There was a server error." });
  }
};

const getMovieById = async (req, res) => {
  const id = req.params.id;

  try {
    const movie = await Movie.findById(id);

    if (!movie) {
      return res.status(404).json({ error: "Movie not found" });
    }

    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json({ error: "There was a server error" });
  }
};

const updateMovieById = async (req, res) => {
  const id = req.params.id;

  const { title, director, releaseYear, genre } = req.body;

  try {
    const updatedMovie = await Movie.findByIdAndUpdate(
      id,
      { title, director, releaseYear, genre },
      { new: true }
    );

    if (!updatedMovie) {
      return res.status(404).json({ error: "Movie not found" });
    }

    res.status(200).json(updatedMovie);
  } catch (error) {
    res.status(500).json({ error: "There was a server error." });
  }
};
const getMovieReviews = async (req, res) => {};

const deleteMovieById = async (req, res) => {
  const id = req.params.id;

  try {
    const deletedMovie = await Movie.findByIdAndDelete(id);

    if (!deletedMovie) {
      return res.status(404).json({ error: "Movie not found" });
    }

    res.status(200).json(deletedMovie);
  } catch (error) {
    res.status(500).json({ error: "There was a server error." });
  }
};

module.exports = {
  addMovie,
  getAllMovies,
  getMovieById,
  updateMovieById,
  getMovieReviews,
  deleteMovieById,
};
