const express = require("express");
const router = express.Router();
const moviesRoutes = require("./movies/moviesRoutes");
const tvRoutes = require("./tv/tvRoutes");
const userRoutes = require("./user/userRoutes");
const generalRoutes = require("./general/generalRoutes");

router.use("/user", userRoutes);
router.use("/movies", moviesRoutes);
router.use("/tv", tvRoutes);
router.use("/general", generalRoutes);

module.exports = router;

/*
MOVIES ROUTES:
http://localhost:4000/movies/nowPlaying
http://localhost:4000/movies/popular
http://localhost:4000/movies/topRated
http://localhost:4000/movies/upcoming


TV ROUTES:

http://localhost:4000/tv/airingToday
http://localhost:4000/tv/getOnTheAir
http://localhost:4000/tv/getPopular
http://localhost:4000/tv/getTopRated



*/
