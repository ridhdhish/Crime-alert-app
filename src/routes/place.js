const express = require("express");
const {
  getAllPlaces,
  getOnePlace,
  addPlace,
  addPlaceCrimeStatus,
  getCurrentLocationAroundPlaces,
} = require("../controllers/place");
const router = express.Router();
const auth = require("../middlewares/auth");
const { check } = require("express-validator");

/**
 * route : GET /api/place/all/:id/:kms
 * access : Public
 * desc: Get all places(use /* /* as id) / get nearby Places(use particular place /id/kms)
 */
router.get("/all/:id/:kms", getAllPlaces);

/**
 * route : POST /api/place
 * access : Private
 * desc: Add place
 */
router.post("/", auth, addPlace);

/**
 * route : PUT /api/place
 * access : Private
 * desc: Add / update place crime status
 */
router.put(
  "/",
  [
    check("id", "id is required").not().isEmpty(),
    check("crimeStatus", "crimeStatus is required").not().isEmpty(),
  ],
  auth,
  addPlaceCrimeStatus
);

/**
 * route : GET /api/place/around?lat=xx&long=xx&city=xx?kms=xx
 * access : Private
 * desc: Get place around data
 */
router.get("/around", auth, getCurrentLocationAroundPlaces);

/**
 * route : GET /api/place/:id
 * access : Private
 * desc: Get Particular place
 */
router.get("/:id", auth, getOnePlace);

exports.placeRoute = router;
