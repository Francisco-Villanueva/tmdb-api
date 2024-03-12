const express = require("express");
const { validateUser } = require("../../middleware/auth");
const router = express.Router();

const {
  getAllUsers,
  getUserById,
  createPlaylist,
  addToPlaylist,
  addFavoriteMovie,
  addFavoriteTv,
  getPlaylist,
  deleteFavoriteMovie,
  editUser,
  deleteFavoriteTv,
  deletePlaylist,
} = require("./services");

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.put("/:userId", editUser);
router.post("/:userId/favorites/movies/:movieId", addFavoriteMovie);
router.post("/:userId/favorites/tv/:tvId", addFavoriteTv);
router.delete("/:userId/favorites/movies/:movieId", deleteFavoriteMovie);
router.delete("/:userId/favorites/tv/:tvId", deleteFavoriteTv);
router.post("/:userId/playlist", createPlaylist);
router.get("/:userId/playlist", getPlaylist);
router.post("/:userId/playlist/:playlist_id/:movieId", addToPlaylist);
router.delete("/:userId/playlist/:playlist_id", deletePlaylist);

const { logOut, register, login, me, secret } = require("./logServices");
router.post("/register", register);
router.post("/login", login);
router.get("/secret", secret);
router.get("/me", validateUser, me);
router.post("/logout", logOut);

module.exports = router;
