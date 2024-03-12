const Sequelize = require("sequelize");
require("dotenv").config();
const { DB_URL } = process.env;
const sequelize = new Sequelize(DB_URL, {
  dialect: "postgres",
  logging: false,
});

module.exports = sequelize;