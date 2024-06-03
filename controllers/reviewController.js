const Review = require("../models/Review");

const createReview = async (req, res) => {
  const { movieId, rating, comment } = req.body;
  const { userId } = req.user;

  try {
    const newReview = new Review({
      movieId,
      userId,
      rating,
      comment,
    });

    await newReview.save();

    res.status(201).json(newReview);
  } catch (error) {
    res.status(500).json({ error: "There was a server error." });
  }
};

const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find();
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: "There was a server error." });
  }
};

const getReviewById = async (req, res) => {
  const id = req.params.id;

  try {
    const review = await Review.findById(id);

    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }

    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ error: "There was a server error." });
  }
};

const updateReviewById = async (req, res) => {
  const id = req.params.id;
  const { rating, comment } = req.body;

  try {
    const updatedReview = await Review.findByIdAndUpdate(
      id,
      { rating, comment },
      { new: true }
    );

    if (!updatedReview) {
      return res.status(404).json({ error: "Review not found" });
    }

    res.status(200).json(updatedReview);
  } catch (error) {
    res.status(500).json({ error: "There was a server error." });
  }
};

const deleteReviewById = async (req, res) => {
  const id = req.params.id;

  try {
    const deletedReview = await Review.findByIdAndDelete(id);

    if (!deletedReview) {
      return res.status(404).json({ error: "Review not found" });
    }

    res.status(200).json(deletedReview);
  } catch (error) {
    res.status(500).json({ error: "There was a server error." });
  }
};

module.exports = {
  createReview,
  getAllReviews,
  getReviewById,
  updateReviewById,
  deleteReviewById,
};
