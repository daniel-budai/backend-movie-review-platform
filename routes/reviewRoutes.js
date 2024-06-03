const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/reviewController");
const { isAdmin, authenticate } = require("../middlewares/auth");

router.post("/", authenticate, reviewController.createReview);
router.get("/", reviewController.getAllReviews);
router.get("/:id", reviewController.getReviewById);
router.put("/:id", authenticate, isAdmin, reviewController.updateReviewById);
router.delete("/:id", authenticate, isAdmin, reviewController.deleteReviewById);

module.exports = router;
