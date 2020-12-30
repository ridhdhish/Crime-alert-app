const { authRouter } = require("./auth");
const { userRouter } = require("./user");
const { relativeRouter } = require("./relative");
const { placeRoute } = require("./place");

module.exports = {
  authRouter,
  userRouter,
  relativeRouter,
  placeRoute,
};
