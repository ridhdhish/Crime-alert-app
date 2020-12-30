const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { validationResult } = require("express-validator");

const showError = require("../config/showError");
const generateToken = require("../config/generateToken");

const signUp = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return showError(errors.array(), res, 400);
  }

  const {
    firstname,
    lastname,
    password,
    email,
    DOB,
    mobileNumber,
    address,
  } = req.body;

  try {
    const user = await User.findOne({ email });

    //id user exists return error
    if (user) {
      return showError("User with this email already exists", res, 400);
    }

    //create new user
    const newUser = new User({
      firstname,
      lastname,
      password,
      email,
      DOB,
      mobileNumber,
      address,
    });

    // encrypt the password
    const sault = await bcrypt.genSalt(12);
    newUser.password = await bcrypt.hash(newUser.password, sault);

    //generate jwt for user
    const token = generateToken(newUser, jwt);
    await newUser.save();

    return res.status(200).json({
      user: {
        ...newUser._doc,
        password: null,
      },
      token,
    });
  } catch (error) {
    showError(error.message, res);
  }
};

const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return showError(errors.array(), res, 400);
  }

  const { email, password } = req.body;

  try {
    //check user with email exist or not
    const user = await User.findOne({
      email,
    });

    if (!user) {
      return showError("Invalid credentials", res, 422);
    }
    //match hash password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return showError("Invalid credentials", res, 422);
    }
    //generate token
    const token = generateToken(user, jwt);

    return res.status(200).json({
      user: {
        ...user._doc,
        password: null,
      },
      token,
    });
  } catch (error) {
    showError(error.message, res);
  }
};

module.exports = {
  signUp,
  login,
};
