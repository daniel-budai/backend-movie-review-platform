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

const getMovieReviews = async (req, res) => {
  const id = req.params.id;

  try {
    const reviews = await Review.find({ movieId: id });

    if (!reviews.length) {
      return res.status(404).json({ error: "No reviews found for this movie" });
    }

    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: "There was a server error." });
  }
};

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

const averageRating = async (req, res) => {
  try {
    const moviesWithAverageRating = await Movie.aggregate([
      {
        $lookup: {
          from: "reviews",
          localField: "_id",
          foreignField: "movieId",
          as: "reviews",
        },
      },
      {
        $unwind: {
          path: "$reviews",
        },
      },
      {
        $group: {
          _id: "$_id",
          title: { $first: "$title" },
          director: { $first: "$director" },
          releaseYear: { $first: "$releaseYear" },
          genre: { $first: "$genre" },
          averageRating: { $avg: "$reviews.rating" },
        },
      },
    ]);

    res.status(200).json(moviesWithAverageRating);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  addMovie,
  getAllMovies,
  getMovieById,
  updateMovieById,
  getMovieReviews,
  deleteMovieById,
  averageRating,
};
