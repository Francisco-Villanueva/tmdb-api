const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db");
class FavoritesMovie extends Model {}

FavoritesMovie.init(
  {
    idMovie: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize: sequelize,
    modelName: "favoritesMovie",
    timestamps: false,
  }
);
module.exports = { FavoritesMovie };
