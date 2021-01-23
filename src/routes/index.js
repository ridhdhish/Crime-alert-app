const { authRouter } = require("./auth");
const { userRouter } = require("./user");
const { relativeRouter } = require("./relative");
const { placeRoute } = require("./place");
const { crimeRoute } = require("./crime");

module.exports = {
  authRouter,
  userRouter,
  relativeRouter,
  placeRoute,
  crimeRoute,
};
