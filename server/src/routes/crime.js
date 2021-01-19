const express = require("express");
const router = express.Router();
const Crime = require("../models/crime");
const Place = require("../models/place");
const sendResponse = require("../utils/sendResponse");

/**
 * route : POST /api/crime
 * access : Public
 * desc: Register crime
 */
router.post("/", async (req, res) => {
  const { token } = req.body;
  try {
    //user is not authenticated but need help
    if (!token) {
      const { firstName, lastName, mobileNumber, address } = req.body;
      const { location, city, state, address: area } = req.body;

      const place = new Place({
        location,
        city,
        state,
        address,
      });
      await place.save();

      const crime = new Crime({
        userData: {
          firstName,
          lastName,
          mobileNumber,
          address: area,
        },
        placeId: place.id,
      });
      await crime.save();

      /**
       * @Todo
       * Send crime data to police
       */

      return sendResponse("Crime reported successfully", res, 200);

      //user is authenticated and need help
    } else {
    }
  } catch (error) {
    sendResponse(error.message, res);
  }
});

exports.crimeRoute = router;
