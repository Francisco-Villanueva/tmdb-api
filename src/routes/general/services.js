const axios = require("axios");
require("dotenv").config();
const { API_KEY, OPTIONS_KEY } = process.env;

const search = async (req, res) => {
  try {
    const { toSearch } = req.params;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: OPTIONS_KEY,
      },
    };

    const movies1 = await axios.get(
      `https://api.themoviedb.org/3/search/movie?query=${toSearch}}&include_adult=false&language=en-US&page=1`,
      options
    );
    const movies2 = await axios.get(
      `https://api.themoviedb.org/3/search/movie?query=${toSearch}}&include_adult=false&language=en-US&page=2`,
      options
    );

    const tv1 = await axios.get(
      `https://api.themoviedb.org/3/search/tv?query=${toSearch}}&include_adult=false&language=en-US&page=1`,
      options
    );
    const tv2 = await axios.get(
      `https://api.themoviedb.org/3/search/tv?query=${toSearch}}&include_adult=false&language=en-US&page=2`,
      options
    );

    const movies = movies1.data.results.concat(movies2.data.results);
    const tv = tv1.data.results.concat(tv2.data.results);
    res.status(200).json({ movies, tv });
    // fetch(
    //   `https://api.themoviedb.org/3/search/movie?query=${movie_name}}&include_adult=false&language=en-US&page=1`,
    //   options
    // )
    //   .then((response) => response.json())
    //   .then((response) => res.status(200).json(response))
    //   .catch((err) => console.error(err));
  } catch (error) {
    res.status(404).json({ error });
  }
};

module.exports = {
  search,
};
