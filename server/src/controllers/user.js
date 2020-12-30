const User = require("../models/user");
const sendResponse = require("../config/sendResponse");

const bcrypt = require("bcryptjs");

// Get User
const me = (req, res) => {
  try {
    const user = req.user;
    return sendResponse({ user }, res, 200);
  } catch (error) {
    sendResponse(error.message, res);
  }
};

// Update User
const updateMe = async (req, res) => {
  try {
    const user = await await User.findByIdAndUpdate(req.user.id, req.body);
    user.password = null;
    if (!user) {
      return sendResponse("Unable to update user", res, 404);
    }
    res.json({ ...user._doc, ...req.body });
  } catch (err) {
    sendResponse(err.message, res);
  }
};

// Delete User
const deleteMe = async (req, res) => {
  try {
    const user = await User.findByIdAndRemove(req.user.id);

    if (!user) {
      return sendResponse("Unable to delete user", res, 404);
    }
    res.json({ message: "User deleted" });
  } catch (err) {
    sendResponse(err.message, res);
  }
};

// Change password
const changePassword = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    let isMatch = await bcrypt.compare(req.body.currentPassword, user.password);

    if (!isMatch) {
      return sendResponse("Invalid current password!", res, 400);
    }

    isMatch = await bcrypt.compare(req.body.newPassword, user.password);

    if (isMatch) {
      return sendResponse("Please enter new password", res, 400);
    }

    const salt = await bcrypt.genSalt(12);
    const password = await bcrypt.hash(req.body.newPassword, salt);

    await User.findByIdAndUpdate(req.user.id, {
      password,
    });

    return sendResponse("New password updated successfully", res, 200);
  } catch (err) {
    sendResponse(err.message, res);
  }
};

module.exports = {
  me,
  updateMe,
  deleteMe,
  changePassword,
};
