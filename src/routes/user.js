const express = require("express");
const router = express.Router();
const requireLogin = require("../middlewares/requireLogin");

const { me } = require("../controllers/user");

/**
 * route : GET /api/user/me
 * access : Private
 * desc: Get a user
 */
router.get("/me", requireLogin, me);

exports.userRouter = router;
