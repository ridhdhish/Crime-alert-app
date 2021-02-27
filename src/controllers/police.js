const { validationResult } = require("express-validator");
const sendResponse = require("../utils/sendResponse");
const Police = require("../models/police");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");
const jwt = require("jsonwebtoken");

const authPolice = async (req, res) => {
  const { login, key } = req.query;
  if (key !== "police") {
    return sendResponse("Verification failed as police, invalid key", res, 400);
  }
  try {
    if (login) {
      const { contactNumber, password, pushToken } = req.body;
      if (!contactNumber && !password) {
        return sendResponse("Please provide all fields", res, 400);
      }
      //check user with contactNumber exist or not
      const user = await Police.findOne({
        contactNumber,
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

      return res.status(200).json({
        user: {
          ...user._doc,
          password: null,
          pushToken: null,
        },
        token,
      });
    } else {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return sendResponse(errors.array(), res, 400);
      }

      const {
        name,
        password,
        contactNumber,
        address,
        location,
        pushToken,
      } = req.body;
      let user = await Police.findOne({ contactNumber });

      //id user exists return error
      if (user) {
        return sendResponse("Police Station already registered.", res, 400);
      }
      console.log(pushToken);
      //create new user
      const newUser = new Police({
        name,
        password,
        contactNumber,
        address,
        location,
        pushToken: pushToken || "none",
      });

      // encrypt the password
      const sault = await bcrypt.genSalt(12);
      newUser.password = await bcrypt.hash(newUser.password, sault);

      //generate jwt for user
      const token = generateToken(newUser.id, jwt);
      await newUser.save();

      return res.status(200).json({
        user: {
          ...newUser._doc,
          password: null,
          pushToken: null,
        },
        token,
      });
    }
  } catch (error) {
    sendResponse(error.message, res);
  }
};

module.exports = {
  authPolice,
};
