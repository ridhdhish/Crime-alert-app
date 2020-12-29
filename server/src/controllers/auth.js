const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { validationResult } = require("express-validator");

const showError = require("../config/showError");
const generateToken = require("../config/generateToken");

const signUp = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: errors.array(),
    });
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
      return res.status(400).json({
        message: "User with this email already exists",
      });
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
    showError(error, res);
  }
};

const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: errors.array(),
    });
  }

  const { email, password } = req.body;

  try {
    //check user with email exist or not
    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(422).json({
        message: "Invalid credentials",
      });
    }
    //match hash password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(422).json({
        message: "Invalid credentials",
      });
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
    showError(error, res);
  }
};

module.exports = {
  signUp,
  login,
};
