const { validateToken } = require("../config/tokens");

const validateUser = (req, res, next) => {
  const { token } = req.cookies;
  const { user } = validateToken(token);

  if (user) {
    req.user = user;
    return next();
  } else {
    res.sendStatus(401);
  }
};

module.exports = {
  validateUser,
};
