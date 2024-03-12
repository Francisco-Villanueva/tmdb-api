const { FavoritesTv } = require("./FavoritesTv");
const { FavoritesMovie } = require("./FavoritesMovie");
const { Movies } = require("./Movies");
const { Playlist } = require("./Playlist");
const { User } = require("./User");

User.hasMany(FavoritesMovie, { as: "user_favorite_movie" });
User.hasMany(FavoritesTv, { as: "user_favorite_tv" });

User.hasMany(Playlist, { as: "user_playlist" });
Playlist.hasMany(Movies, { as: "playlist_movie" });

module.exports = {
  User,
};
