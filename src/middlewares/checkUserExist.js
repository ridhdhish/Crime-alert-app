const User = require("../models/user_schema");
const showError = require("../config/showError");

module.exports = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        error: "user not found",
      });
    }
    next();
  } catch (error) {
    showError(error, res);
  }
};
