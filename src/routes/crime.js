const express = require("express");
const auth = require("../middlewares/auth");
const { registerCrime, seenCrime } = require("../controllers/crime");
const router = express.Router();

/**
 * route : POST /api/crime
 * access : Public
 * desc: Register crime
 */
router.post("/", registerCrime);

/**
 * route : POST /api/crime/seenAlert/:crimeId
 * access : Private
 * desc: set seen crime crime
 */
router.put("/seenAlert/:crimeId", auth, seenCrime);

exports.crimeRoute = router;
