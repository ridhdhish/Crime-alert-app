const express = require("express");
const auth = require("../middlewares/auth");
const {
  registerCrime,
  seenCrime,
  policeSeenCrime,
} = require("../controllers/crime");
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
 * desc: set seen relative crime
 */
router.put("/seenAlert/:crimeId", auth, seenCrime);

/**
 * route : POST /api/crime/seenAlert/:crimeId/:policeId
 * access : Private
 * desc: set seen police crime
 */
router.put("/seenAlert/:crimeId/:policeId", policeSeenCrime);

exports.crimeRoute = router;
