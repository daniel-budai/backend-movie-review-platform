require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;

const userRoutes = require("./routes/userRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const movieRoutes = require("./routes/movieRoutes");

const app = express();

app.use(express.json());
app.use("/users", userRoutes);
app.use("/reviews", reviewRoutes);
app.use("/movies", movieRoutes);

mongoose
  .connect(MONGODB_URI, {})
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(err));

app.listen(PORT, () => {
  console.log(`listenting to ${PORT}`);
});
