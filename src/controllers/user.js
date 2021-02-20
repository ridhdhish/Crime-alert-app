const User = require("../models/user");
const KeyValueDb = require("../models/keyValueDb");
const Relative = require("../models/relative");
const sendResponse = require("../utils/sendResponse");
const generateToken = require("../utils/generateToken");

const bcrypt = require("bcryptjs");
const { v4 } = require("uuid");
const { validationResult } = require("express-validator");
const { sendMail } = require("../utils/sendMail");
const {
  FORGET_PASSWORD_PREFIX,
  SECRET_TOKEN_PREFIX,
} = require("../config/constant");
const jwt = require("jsonwebtoken");

const me = (req, res) => {
  try {
    const user = req.user;
    return sendResponse(
      { ...user._doc, password: null, appPassword: null, pushToken: null },
      res,
      200,
      false
    );
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
    res.json({
      ...user._doc,
      ...req.body,
      password: null,
      appPassword: null,
      pushToken: null,
    });
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
    const keyValue = await KeyValueDb.findOneAndDelete({
      key: `${SECRET_TOKEN_PREFIX}${req.user.id}`,
    });
    if (!keyValue) {
      return sendResponse("Unable to delete key value", res, 404);
    }
    const relative = await Relative.deleteMany({ userId: req.user.id });

    if (!relative) {
      return sendResponse("Unable to delete relatives", res, 404);
    }
    const existingRelative = await Relative.findOne({
      existingUserId: req.user.id,
    });
    if (existingRelative) {
      await existingRelative.remove();
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
        appPassword: null,
        pushToken: null,
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

const updateNotificationSetting = async (req, res) => {
  const {
    allow,
    sound,
    vibrate,
    onSentAlert,
    onReceiveAlert,
    onSeenAlert,
  } = req.body;
  try {
    const user = await User.findById(req.user.id);
    if (user) {
      user.notificationSetting.allow = allow;
      user.notificationSetting.sound = sound;
      user.notificationSetting.vibrate = vibrate;
      user.notificationSetting.onSentAlert = onSentAlert;
      user.notificationSetting.onReceiveAlert = onReceiveAlert;
      user.notificationSetting.onSeenAlert = onSeenAlert;

      await user.save();
      return sendResponse(user.notificationSetting, res, 200);
    } else {
      sendResponse("User not found", 404);
    }
  } catch (error) {
    sendResponse(error.message, res);
  }
};

const setAppPassword = async (req, res) => {
  const { password, userId } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return sendResponse("User not found", 404);
    }
    const sault = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, sault);
    user.appPassword = hashedPassword;

    await user.save();

    sendResponse("Password created", res, 200);
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
  updateNotificationSetting,
  setAppPassword,
};
