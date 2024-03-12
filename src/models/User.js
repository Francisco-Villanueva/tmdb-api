const { DataTypes, Model } = require("sequelize");
const { hash, genSaltSync } = require("bcrypt");
const sequelize = require("../db");
class User extends Model {
  async validatePassword(loginPw) {
    // console.log(this.email, " // ", this.password, "//  pw login: ", loginPw);
    try {
      const hashRes = await hash(loginPw, this.salt);
      return hashRes === this.password;
    } catch (err) {
      return console.log("se rompe el validate: ", err);
    }
  }
}

User.init(
  {
    // Model attributes are defined here
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    color: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    salt: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize: sequelize,
    modelName: "User",
    timestamps: false,
  }
);

User.beforeCreate((user) => {
  // console.log({ user });
  const salt = genSaltSync(8);
  user.salt = salt;

  return hash(user.password, user.salt)
    .then((hash) => {
      user.password = hash;
    })
    .catch((e) => console.log(e));
});

module.exports = { User };
