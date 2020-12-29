const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");

const { me } = require("../controllers/user");

/**
 * route : GET /api/user/me
 * access : Private
 * desc: Get a user
 */
router.get("/me", auth, me);

exports.userRouter = router;
