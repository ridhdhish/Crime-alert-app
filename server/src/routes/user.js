const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const {
  me,
  updateMe,
  deleteMe,
  changePassword,
  forgetPassword,
  resetPassword,
} = require("../controllers/user");
const { check } = require("express-validator");

/**
 * route : GET /api/user/me
 * access : Private
 * desc: Get a user
 */
router.get("/me", auth, me);

/**
 * route : PUT /api/user/updateMe
 * access : Private
 * desc: Update user details
 */
router.put("/updateMe", auth, updateMe);

/**
 * route : DELETE /api/user/deleteMe
 * access : Private
 * desc: Delete existing user
 */
router.delete("/deleteMe", auth, deleteMe);

/**
 * route : PUT /api/user/changePassword
 * access : Private
 * desc: Change password
 */
router.put("/changePassword", auth, changePassword);

/**
 * route : POST /api/user/forgetPassword
 * access : Public
 * desc: Forget password email
 */
router.post(
  "/forgetPassword",
  [check("email", "valid email is required").isEmail()],
  forgetPassword
);

/**
 * route : POST /api/user/resetPassword
 * access : Public
 * desc:password Reset
 */
router.post(
  "/resetPassword",
  [
    check("newPassword", "newPassword is required of length 8-32")
      .not()
      .isEmpty()
      .isLength({ min: 8, max: 32 }),
    check("token", "token is required").exists(),
  ],
  resetPassword
);

exports.userRouter = router;
