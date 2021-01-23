const showError = require("../config/showError");
const User = require("../models/user_schema");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

/**
 * Check whether password is provided
 * if provided then checks if it's valid or not
 */
module.exports = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json({
      errors: errors.array(),
    });
  }

  const { password } = req.body;
  try {
    const user = await User.findById(req.user.id);
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        error: "Invalid password",
      });
    }
    return next();
  } catch (error) {
    showError(error, res);
  }
};
