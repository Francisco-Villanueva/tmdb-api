const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db");
class Playlist extends Model {}

Playlist.init(
  {
    // Model attributes are defined here
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: sequelize,
    modelName: "playlist",
    timestamps: false,
  }
);
module.exports = { Playlist };
