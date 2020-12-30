const express = require("express");
const { getAllPlaces, getOnePlace } = require("../controllers/place");
const router = express.Router();
const auth = require("../middlewares/auth");

/**
 * route : GET /api/place/all/:id
 * access : Public
 * desc: Get all places(use * as id) / get nearby Places(use particular place id)
 */
router.get("/all/:id", getAllPlaces);

/**
 * route : GET /api/place/:id
 * access : Private
 * desc: Get Particular place
 */
router.get("/:id", auth, getOnePlace);

exports.placeRoute = router;
