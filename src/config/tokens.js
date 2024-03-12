const { sign, verify } = require("jsonwebtoken");
const SECRET = "HASKDJASHDKJAHSDJKASHDKJASHDAJS";

const generateToken = (payload) => {
  const newToken = sign({ user: payload }, SECRET, {
    expiresIn: "2d",
  });
  // console.log({ newToken });
  return newToken;
};
const validateToken = (token) => {
  return verify(token, SECRET);
};

module.exports = {
  generateToken,
  validateToken,
};
