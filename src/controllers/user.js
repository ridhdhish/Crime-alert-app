const User = require("../models/user");
const KeyValueDb = require("../models/keyValueDb");
const sendResponse = require("../utils/sendResponse");
const generateToken = require("../utils/generateToken");

const bcrypt = require("bcryptjs");
const { v4 } = require("uuid");
const { validationResult } = require("express-validator");
const { sendMail } = require("../utils/sendMail");
const { FORGET_PASSWORD_PREFIX } = require("../config/constant");
const jwt = require("jsonwebtoken");

const me = (req, res) => {
  try {
    const user = req.user;
    return sendResponse({ user }, res, 200);
  } catch (error) {
    sendResponse(error.message, res);
  }
};

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

const forgetPassword = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return sendResponse(errors.array(), res, 400);
  }
  const {
    body: { email },
  } = req;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return sendResponse(
        "If you have registered with this email then you will receive email, else use valid email.",
        res,
        200
      );
    }
    const token = v4();
    await sendMail(
      user.email,
      `
      <a href="http://locahost:3000/forget-password/${token}">Reset Password</a>
    `
    );

    await KeyValueDb.create({
      key: `${FORGET_PASSWORD_PREFIX}${token}`,
      value: user.id,
    });

    sendResponse(
      "If you have registered with this email then you will receive email, else use valid email.",
      res,
      200
    );
  } catch (error) {
    sendResponse(error.message, res);
  }
};

const resetPassword = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return sendResponse(errors.array(), res, 400);
  }
  const { newPassword, token } = req.body;
  try {
    const data = await KeyValueDb.findOne({
      key: `${FORGET_PASSWORD_PREFIX}${token}`,
    });
    if (!data) {
      return sendResponse("Reset link expired, try again", res, 401);
    }
    const user = await User.findById(data.value);
    if (!user) {
      return sendResponse("User not exist", res, 404);
    }
    const sault = await bcrypt.genSalt(12);
    user.password = await bcrypt.hash(newPassword, sault);

    user.markModified("password");

    await user.save();

    await KeyValueDb.findOneAndDelete({ _id: data.id });

    const jwtToken = generateToken(user.id, jwt);

    return sendResponse(
      {
        ...user._doc,
        password: null,
        token: jwtToken,
      },
      res,
      200
    );
  } catch (error) {
    sendResponse(error.message, res);
  }
};

const checkFieldValueExists = async (req, res) => {
  const { field, value } = req.params;
  try {
    const user = await User.findOne({
      [field]: field === "mobileNumber" ? +value : value,
    });
    sendResponse(!!user, res, 200);
  } catch (error) {
    sendResponse(error.message, res);
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (user) {
      return sendResponse(
        { mobileNumber: user.mobileNumber, email: user.email },
        res,
        200
      );
    }
    sendResponse("User not found", res, 404);
  } catch (error) {
    sendResponse(error.message, res);
  }
};

module.exports = {
  me,
  updateMe,
  deleteMe,
  changePassword,
  forgetPassword,
  resetPassword,
  checkFieldValueExists,
  getUserById,
};
