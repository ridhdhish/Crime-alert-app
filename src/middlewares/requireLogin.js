/*
 *this is the middleware for authorization and preventing from routing without the registration
 */
const User = require("../models/user");
const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    return res.status(401).json({
      message: "You need to be loggedIn",
    });
  }
  const token = authHeader.split(" ")[1];
  if (!token || token === "") {
    return res.status(401).json({
      message: "You need to be loggedIn",
    });
  }
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return res.status(401).json({
      message: "You need to be loggedIn",
    });
  }
  if (!decodedToken) {
    return res.status(401).json({
      message: "You need to be loggedIn",
    });
  }
  req.user = await User.findById(decodedToken.user.id).select("-password");
  return next();
};
