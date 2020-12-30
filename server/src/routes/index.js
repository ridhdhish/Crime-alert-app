const { authRouter } = require("./auth");
const { userRouter } = require("./user");
const { placeRoute } = require("./place");

module.exports = {
  authRouter,
  userRouter,
  placeRoute,
};
