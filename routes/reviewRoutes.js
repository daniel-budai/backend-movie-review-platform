const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/reviewController");

router.post("/reviews");
router.get("/reviews");
router.get("/reviews/:id");
router.put("/reviews/:id");
router.delete("/reviews/:id");

module.exports = router;
