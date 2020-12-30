const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");

const {
  me,
  updateMe,
  deleteMe,
  changePassword,
} = require("../controllers/user");

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

exports.userRouter = router;
