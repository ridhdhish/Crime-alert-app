const { authRouter } = require("./auth");
const { userRouter } = require("./user");
const { relativeRouter } = require("./relative");

module.exports = {
  authRouter,
  userRouter,
  relativeRouter,
};
