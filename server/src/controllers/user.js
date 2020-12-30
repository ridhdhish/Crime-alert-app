const User = require("../models/user");
const showError = require("../config/showError");

// Get User
const me = (req, res) => {
  const user = req.user;
  return res.status(200).json({
    user,
  });
};

// Update User
const updateMe = async (req, res) => {
  try {
    const user = await await User.findByIdAndUpdate(req.user.id, req.body);
    user.password = null;
    if (!user) {
      return showError("Unable to update user", res, 404);
    }
    res.json({ ...user._doc, ...req.body });
  } catch (err) {
    showError(err.message, res);
  }
};

// Delete User
const deleteMe = async (req, res) => {
  try {
    const user = await User.findByIdAndRemove(req.user.id);

    if (!user) {
      return showError("Unable to delete user", res, 404);
    }
    res.json({ message: "User deleted" });
  } catch (err) {
    showError(err.message, res);
  }
};

module.exports = {
  me,
  updateMe,
  deleteMe,
};
