const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db");
class Movies extends Model {}

Movies.init(
  {
    idMovie: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize: sequelize,
    modelName: "movies",
    timestamps: false,
  }
);
module.exports = { Movies };
