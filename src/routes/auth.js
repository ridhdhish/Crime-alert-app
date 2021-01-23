const { Router } = require("express");
const router = Router();
const { check } = require("express-validator");

//controllers
const { login, signUp } = require("../controllers/auth");

/**
 * route : POST /api/auth/signup
 * access : Public
 * desc: Register user
 */
router.post(
  "/signup",
  [
    check("firstname", "username is required").not().isEmpty(),
    check("lastname", "lastname is required").not().isEmpty(),
    check("password", "password is required. Length should be between 8-32")
      .not()
      .isEmpty()
      .isLength({ max: 32, min: 8 }),
    check("email", "email is required").isEmail(),
    check("mobileNumber", "mobileNumber is required and of 10 digits")
      .not()
      .isEmpty()
      .isLength({ min: 10 }),
    check("address", "address is required").not().isEmpty(),
  ],
  signUp
);

/**
 * route : POST /api/auth/login
 * access : Public
 * desc: Register user
 */
router.post(
  "/login",
  [
    check("email", "email is required").exists(),
    check("password", "password is required").exists(),
  ],
  login
);

exports.authRouter = router;
