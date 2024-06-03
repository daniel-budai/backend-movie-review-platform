const express = require("express");
const router = express.Router();
const movieController = require("../controllers/movieController");

router.get("/");
router.post("/");
router.get("/:id");
router.put("/:id");
router.get("/movies/:id/reviews"); //hämta för en specifik film
router.delete("/movies/:id");
router.get("/ratings"); // Hämta en lista med alla filmer och deras genomsnittliga betyg. aggregate

module.exports = router;
