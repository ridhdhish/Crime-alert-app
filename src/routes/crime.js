const express = require("express");
const { check } = require("express-validator");
const auth = require("../middlewares/auth");
const { registerCrime, seenCrime } = require("../controllers/crime");
const router = express.Router();

/**
 * route : POST /api/crime
 * access : Public
 * desc: Register crime
 */
router.post(
  "/",
  check("location", "Request failed due to not getting location")
    .not()
    .isEmpty(),
  registerCrime
);

/**
 * route : POST /api/crime/seenCrime/:crimeId
 * access : Private
 * desc: set seen crime crime
 */
router.put("/seenAlert/:crimeId", auth, seenCrime);

exports.crimeRoute = router;
