const { User } = require("../../models/User");
const { Playlist } = require("../../models/Playlist");
const { FavoritesMovie } = require("../../models/FavoritesMovie");
const { FavoritesTv } = require("../../models/FavoritesTv");

const { Movies } = require("../../models/Movies");
const { col } = require("sequelize");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      include: [
        {
          model: Playlist,
          as: "user_playlist",
          include: { model: Movies, as: "playlist_movie" },
        },
        { model: FavoritesMovie, as: "user_favorite_movie" },
        { model: FavoritesTv, as: "user_favorite_tv" },
      ],
    });

    res.status(200).json(users);
  } catch (error) {
    res.status(401).send(error);
  }
};
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findOne({
      where: { id: id },
      include: [
        {
          model: Playlist,
          as: "user_playlist",
          include: { model: Movies, as: "playlist_movie" },
        },
        { model: FavoritesMovie, as: "user_favorite_movie" },
        { model: FavoritesTv, as: "user_favorite_tv" },
      ],
    });

    if (!user) {
      console.log("user not found");
      return res.status(401).json({ error: "user not found" });
    }

    // console.log("user by ID: \n", user);
    res.status(200).json(user);
  } catch (error) {
    res.status(401).send(error);
  }
};
const editUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { email, password, name, color } = req.body;

    const user = await User.findOne({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return res.status(404).send("User not found!");
    }

    await user.update({
      email,
      password,
      name,
      color,
    });

    res.status(201).json({ user });
  } catch (error) {
    res.status(401).send(error);
  }
};
const addFavoriteMovie = async (req, res) => {
  try {
    const { userId, movieId } = req.params;

    // 1. Obtener el usuario por su ID
    const user = await User.findByPk(userId);

    // 2. Comprobar si el usuario existe
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    // 3. Comprobar si el favorito ya existe en la lista de favoritos del usuario
    const existingFavorite = await FavoritesMovie.findOne({
      where: { UserId: userId, idMovie: movieId },
    });

    if (existingFavorite) {
      return res.status(400).json({ error: "Movie is already in favorites" });
    }

    // 4. Crear un nuevo registro en la tabla de favoritos
    await FavoritesMovie.create({ UserId: userId, idMovie: movieId });

    // 5. Responder con un mensaje de éxito
    res.status(200).json({ message: "Movie added to favorites" });
  } catch (error) {
    res.status(401).send(error);
  }
};
const deleteFavoriteMovie = async (req, res) => {
  try {
    const { userId, movieId } = req.params;

    // 1. Obtener el usuario por su ID
    const user = await User.findByPk(userId);

    // 2. Comprobar si el usuario existe
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    // 3. Comprobar si el favorito ya existe en la lista de favoritos del usuario
    const existingFavorite = await FavoritesMovie.findOne({
      where: { UserId: userId, idMovie: movieId },
    });

    if (!existingFavorite) {
      return res
        .status(400)
        .json({ error: "Movie dosen't exisist in favorites" });
    }

    // 4. Crear un nuevo registro en la tabla de favoritos
    await FavoritesMovie.destroy({
      where: { UserId: userId, idMovie: movieId },
    });

    // 5. Responder con un mensaje de éxito
    res.status(200).json({ message: "Movie deleted favorites" });
  } catch (error) {
    console.log(error);
    res.status(401).json(error);
  }
};
const addFavoriteTv = async (req, res) => {
  try {
    const { userId, tvId } = req.params;

    console.log(tvId);
    // 1. Obtener el usuario por su ID
    const user = await User.findByPk(userId);

    // 2. Comprobar si el usuario existe
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    // 3. Comprobar si el favorito ya existe en la lista de favoritos del usuario
    const existingFavorite = await FavoritesTv.findOne({
      where: { UserId: userId, idTv: tvId },
    });

    if (existingFavorite) {
      return res.status(400).json({ error: "Tv is already in favorites" });
    }

    // 4. Crear un nuevo registro en la tabla de favoritos
    await FavoritesTv.create({ UserId: userId, idTv: tvId });

    // 5. Responder con un mensaje de éxito
    res.status(201).json({ message: "TV added to favorites" });
  } catch (error) {
    res.status(401).send(error);
  }
};
const deleteFavoriteTv = async (req, res) => {
  try {
    const { userId, tvId } = req.params;
    // 1. Obtener el usuario por su ID
    const user = await User.findByPk(userId);

    // 2. Comprobar si el usuario existe
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // 3. Comprobar si el favorito ya existe en la lista de favoritos del usuario
    const existingFavorite = await FavoritesTv.findOne({
      where: { UserId: userId, idTv: tvId },
    });

    if (!existingFavorite) {
      return res
        .status(400)
        .json({ error: "Tv does't exist at favorite list1" });
    }

    // 4. Crear un nuevo registro en la tabla de favoritos
    await FavoritesTv.destroy({ where: { UserId: userId, idTv: tvId } });

    res.status(201).json({ message: "TV deleted from favorites" });
  } catch (error) {
    res.status(401).send(error);
  }
};

const createPlaylist = async (req, res) => {
  try {
    const { userId } = req.params;
    const { playlist_name } = req.body;

    // Comprobar si el usuario existe
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Comprobar si la playlist ya existe.
    const existingPlaylist = await Playlist.findOne({
      where: { UserId: userId, name: playlist_name },
    });
    if (existingPlaylist) {
      return res.status(400).json({ error: "Playlist already exist!" });
    }

    const newPlaylist = await Playlist.create({
      UserId: userId,
      name: playlist_name,
    });

    res
      .status(200)
      .json({ message: "Playlist created!", response: newPlaylist });
  } catch (error) {
    res.status(401).send(error);
  }
};
const deletePlaylist = async (req, res) => {
  try {
    const { userId, playlist_id } = req.params;
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const playlist = await Playlist.findOne({
      where: { UserId: userId, id: playlist_id },
    });

    if (!playlist) {
      return res.status(404).json({ error: "Playlist not found" });
    }

    await Playlist.destroy({
      where: {
        id: playlist_id,
      },
    });

    res.status(201).send("Playlist Deleted");
  } catch (error) {
    res.status(401).send(error);
  }
};
const getPlaylist = async (req, res) => {
  try {
    const { userId } = req.params;

    // 1. Obtener el usuario por su ID
    const user = await User.findByPk(userId);

    // 2. Comprobar si el usuario existe
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    // 3. Comprobar si el favorito ya existe en la lista de favoritos del usuario
    const playlist = await Playlist.findAll({
      where: { UserId: userId },
      include: { model: Movies, as: "playlist_movie" },
    });

    res.status(200).json(playlist);
  } catch (error) {
    res.status(401).send(error);
  }
};
const addToPlaylist = async (req, res) => {
  try {
    const { userId, movieId, playlist_id } = req.params;
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const playlist = await Playlist.findOne({
      where: { UserId: userId, id: playlist_id },
    });

    if (!playlist) {
      return res.status(404).json({ error: "Playlist not found" });
    }

    const existingMovie = await Movies.findOne({
      where: { playlistId: playlist_id, idMovie: movieId },
    });

    if (existingMovie) {
      return res
        .status(404)
        .json({ error: "Movie already exisit in playlist!" });
    }

    const newMovie = await Movies.create({
      playlistId: playlist_id,
      idMovie: movieId,
    });

    res.status(200).json(newMovie);
  } catch (error) {
    console.log(error);
    res.status(401).send({ ...error });
  }
};
module.exports = {
  getAllUsers,
  getUserById,
  addFavoriteMovie,
  addFavoriteTv,
  createPlaylist,
  addToPlaylist,
  getPlaylist,
  deleteFavoriteTv,
  deleteFavoriteMovie,
  editUser,
  deletePlaylist,
};
