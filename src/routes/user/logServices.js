const { User } = require("../../models/User");
const { generateToken, validateToken } = require("../../config/tokens");
const { FavoritesMovie } = require("../../models/FavoritesMovie");
const { FavoritesTv } = require("../../models/FavoritesTv");
const { Playlist } = require("../../models/Playlist");

const register = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res.status(401).send({ message: "Missing data" });
    }
    const newUser = await User.create({
      email: email,
      name: name,
      password: password,
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.log({ error });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(401).send({ message: "Missing data" });
    }

    const userToCheck = await User.findOne({
      where: {
        email: email,
      },
      include: [
        { model: Playlist, as: "user_playlist" },
        { model: FavoritesMovie, as: "user_favorite_movie" },
        { model: FavoritesTv, as: "user_favorite_tv" },
      ],
    });

    if (!userToCheck) {
      return res.sendStatus(401);
    }

    const pwCheck = await userToCheck.validatePassword(password);

    if (!pwCheck) {
      return res.sendStatus(401);
    } else {
      const payload = {
        id: userToCheck.id,
        email: userToCheck.email,
        name: userToCheck.name,
      };

      const token = generateToken(payload);

      console.log("USER LOGGED!");

      res.cookie("token", token);

      res.json(userToCheck);
    }
  } catch (error) {
    console.log({ error });
  }
};
const secret = async (req, res) => {
  const { token } = req.cookies;
  const { user } = validateToken(token);

  // console.log(user);
  req.user = user;
  res.send(user);
};

const logOut = (req, res) => {
  const { token } = req.cookies;
  res.clearCookie(token);

  res.sendStatus(204);
};
const me = (req, res) => {
  res.send(req.user);
};

module.exports = {
  register,
  login,
  secret,
  logOut,
  me,
};
