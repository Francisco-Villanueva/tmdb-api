const axios = require("axios");
require("dotenv").config();
const { API_KEY } = process.env;
const allTvData = async (req, res) => {
  try {
    const airingToday = await axios.get(
      `https://api.themoviedb.org/3/tv/airing_today?api_key=${API_KEY}&page=3`
    );
    const onTheAir = await axios.get(
      `https://api.themoviedb.org/3/tv/on_the_air?api_key=${API_KEY}&page=2`
    );
    const popular = await axios.get(
      `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}`
    );
    const topRated = await axios.get(`
    https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY}`);

    const objRespones = {
      popular: popular.data.results,
      topRated: topRated.data.results,
      airingToday: airingToday.data.results,
      onTheAir: onTheAir.data.results,
    };

    res.status(200).json(objRespones);
  } catch (error) {
    res.status(404).json({ error });
  }
};

const getDetails = async (req, res) => {
  try {
    const { tv_id } = req.params;

    const response = await axios.get(
      `https://api.themoviedb.org/3/tv/${tv_id}?api_key=${API_KEY}`
    );

    res.status(200).json(response.data);
  } catch (error) {
    res.status(404).json({ error });
  }
};

const getVideo = async (req, res) => {
  try {
    const { tv_id } = req.params;
    const videos = await axios.get(
      `https://api.themoviedb.org/3/tv/${tv_id}/videos?api_key=${API_KEY}`
    );

    res.status(200).json(videos.data);
  } catch (error) {
    res.status(404).json({ error });
  }
};

const getSimilar = async (req, res) => {
  try {
    const { tv_id } = req.params;

    const response = await axios.get(`
    https://api.themoviedb.org/3/tv/${tv_id}/similar?api_key=${API_KEY}`);

    res.status(200).json(response.data);
  } catch (error) {
    res.status(404).json({ error });
  }
};
module.exports = {
  allTvData,
  getDetails,
  getVideo,
  getSimilar,
};
