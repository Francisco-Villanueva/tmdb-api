const express = require("express");
const router = express.Router();
const {
  getVideoKey,
  getDetails,
  getSimilar,
  allMoviesData,
} = require("./services");

router.get("/", allMoviesData);

// router.get("/nowPlaying", getNowPlaying);
// router.get("/popular", getPopular);
// router.get("/topRated", getTopRated);
// router.get("/upcoming", getUpcoming);
router.get("/videos/:movie_id", getVideoKey);
router.get("/details/:movie_id", getDetails);
router.get("/similar/:movie_id", getSimilar);

module.exports = router;
