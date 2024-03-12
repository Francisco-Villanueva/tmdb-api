const axios = require("axios");
require("dotenv").config();
const { API_KEY } = process.env;

const getVideoKey = async (req, res) => {
  try {
    const { movie_id } = req.params;
    const videos = await axios.get(
      `https://api.themoviedb.org/3/movie/${movie_id}/videos?api_key=${API_KEY}`
    );

    res.status(200).json(videos.data);
  } catch (error) {
    res.status(404).json({ error });
  }
};

const getDetails = async (req, res) => {
  try {
    const { movie_id } = req.params;

    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${API_KEY}`
    );

    res.status(200).json(response.data);
  } catch (error) {
    res.status(404).json({ error });
  }
};

const getSimilar = async (req, res) => {
  try {
    const { movie_id } = req.params;

    const response = await axios.get(`
    https://api.themoviedb.org/3/movie/${movie_id}/similar?api_key=${API_KEY}`);

    res.status(200).json(response.data);
  } catch (error) {
    res.status(404).json({ error });
  }
};

const allMoviesData = async (req, res) => {
  try {
    const upcoming = await axios.get(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&append_to_response=videos`
    );
    // const nowPlaying = await getNowPlaying();
    const nowPlaying = await axios.get(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&append_to_response=videos`
    );
    // const popular = await getPopular();
    const popular = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&append_to_response=videos`
    );
    const topRated = await axios.get(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&append_to_response=videos`
    );

    const objRespones = {
      popular: popular.data.results,
      topRated: topRated.data.results,
      upcoming: upcoming.data.results,
      nowPlaying: nowPlaying.data.results,
    };

    res.status(200).json(objRespones);
  } catch (error) {
    res.status(404).json({ error });
  }
};
module.exports = {
  getVideoKey,
  getDetails,
  getSimilar,
  allMoviesData,
};

// curl --request GET \
//      --url 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_release_type=2|3&release_date.gte={min_date}&release_date.lte={max_date}' \
//      --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNDJiNzMzNWE2MDU5MGFkNDcwYjJmZDE5NDIxZWY5ZSIsInN1YiI6IjY0ZWJkZmY2MWZlYWMxMDEzOGRiNzY5YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.x9Nka3QfillNAPLP9bnhaYYOQ2z-nquQ-Wt3K_TUF3Q' \
//      --header 'accept: application/json'
