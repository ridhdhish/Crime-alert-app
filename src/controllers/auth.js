const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const KeyValueDB = require("../models/keyValueDb");
const Relative = require("../models/relative");
const { validationResult } = require("express-validator");
const { v4: generateId } = require("uuid");

const sendResponse = require("../utils/sendResponse");
const generateToken = require("../utils/generateToken");
const { SECRET_TOKEN_PREFIX } = require("../config/constant");
const { sendPushNotification } = require("../utils/sendPushNotification");

const signUp = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return sendResponse(errors.array(), res, 400);
  }

  const {
    firstname,
    lastname,
    password,
    email,
    mobileNumber,
    address,
    pushToken,
  } = req.body;
  try {
    let user = await User.findOne({ email });

    //id user exists return error
    if (user) {
      return sendResponse("User with this email already exists", res, 400);
    }

    user = await User.findOne({ mobileNumber });

    //id user exists return error
    if (user) {
      return sendResponse(
        "User with this mobileNumber already exists",
        res,
        400
      );
    }
    console.log(pushToken);
    //create new user
    const newUser = new User({
      firstname,
      lastname,
      password,
      email,
      mobileNumber,
      address,
      pushToken,
    });

    // encrypt the password
    const sault = await bcrypt.genSalt(12);
    newUser.password = await bcrypt.hash(newUser.password, sault);

    //generate jwt for user
    const token = generateToken(newUser.id, jwt);
    await newUser.save();

    const userKeyValue = new KeyValueDB({
      key: `${SECRET_TOKEN_PREFIX}${newUser.id}`,
      value: newUser,
    });

    await userKeyValue.save();

    const relative = await Relative.findOne({
      $or: [{ email: newUser.email }, { mobileNumber: newUser.mobileNumber }],
    });
    if (relative) {
      relative.pushToken = pushToken;
      relative.existingUserId = newUser.id;
      relative.markModified("pushToken");
      const user = await User.findById(relative.userId);
      if (user) {
        await sendPushNotification({
          body: `Your relative ${newUser.firstname} ${newUser.lastname} joined the Crime Alert App`,
          data: {},
          pushToken: user.pushToken,
          subtitle: "",
          title: "Relative Join",
        });
      }
      await relative.save();
    }

    return res.status(200).json({
      user: {
        ...newUser._doc,
        password: null,
        pushToken: null,
        appPassword: null,
      },
      token,
      secretToken: newUser.id,
    });
  } catch (error) {
    sendResponse(error.message, res);
  }
};

const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return sendResponse(errors.array(), res, 400);
  }

  const { email, password, pushToken } = req.body;

  try {
    //check user with email exist or not
    const user = await User.findOne({
      email,
    });

    if (!user) {
      return sendResponse("Invalid credentials", res, 422);
    }
    //match hash password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return sendResponse("Invalid credentials", res, 422);
    }
    if (pushToken) {
      user.pushToken = pushToken;
      user.markModified("pushToken");
      await user.save();
    }
    //generate token
    const token = generateToken(user.id, jwt);

    const isExist = await KeyValueDB.findOne({
      key: `${SECRET_TOKEN_PREFIX}${user.id}`,
    });

    if (isExist) {
      isExist.value = user;
      await isExist.save();
    } else {
      const userKeyValue = new KeyValueDB({
        key: `${SECRET_TOKEN_PREFIX}${user.id}`,
        value: user,
      });

      await userKeyValue.save();
    }

    return res.status(200).json({
      user: {
        ...user._doc,
        password: null,
        pushToken: null,
        appPassword: null,
      },
      token,
      secretToken: user.id,
    });
  } catch (error) {
    sendResponse(error.message, res);
  }
};

module.exports = {
  signUp,
  login,
};
