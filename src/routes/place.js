const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");

const { me } = require("../controllers/user");

/**
 * route : GET /api/place/:id
 * access : Private
 * desc: Get a user
 */
router.get("/:id", auth, (req, res) => {
  res.json("Place works");
});

exports.placeRoute = router;
