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
  checkFieldValueExists,
  getUserById,
  updateNotificationSetting,
  setAppPassword,
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

/**
 * route : GET /api/user/check
 * access : Public
 * desc: Check field exists
 */
router.get("/check/:field/:value", checkFieldValueExists);

/**
 * route : PUT /api/user/notification
 * access : Private
 * desc: Update notification setting
 */
router.put("/notification", auth, updateNotificationSetting);

/**
 * route : PUT /api/user/setAppPassword
 * access : Private
 * desc: Update setAppPassword
 */
router.put(
  "/setAppPassword",
  [
    check("password", "password is required").exists(),
    check("userId", "userId is required").exists(),
  ],
  setAppPassword
);

/**
 * route : GET /api/user/:id
 * access : Private
 * desc: Get a user ny Id
 */
router.get("/:id", auth, getUserById);
exports.userRouter = router;
