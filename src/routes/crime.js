const express = require("express");
const { check } = require("express-validator");
const { registerCrime } = require("../controllers/crime");
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

exports.crimeRoute = router;
