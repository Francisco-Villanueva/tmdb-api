const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db");
class FavoritesTv extends Model {}

FavoritesTv.init(
  {
    idTv: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize: sequelize,
    modelName: "favoritesTv",
    timestamps: false,
  }
);
module.exports = { FavoritesTv };
