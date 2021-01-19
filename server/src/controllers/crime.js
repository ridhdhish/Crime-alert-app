const { validationResult } = require("express-validator");
const Crime = require("../models/crime");
const Place = require("../models/place");
const sendResponse = require("../utils/sendResponse");

const registerCrime = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return sendResponse(errors.array(), res, 400);
  }

  const authHeader = req.get("Authorization");
  try {
    //user is not authenticated but need help
    if (!authHeader) {
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
          firstName: firstName || "Unknown",
          lastName: lastName || "Unknown",
          mobileNumber: mobileNumber || "Unknown",
          address: area || "Unknown",
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
      const token = authHeader.split(" ")[1];

      /**
       * @Doubt
       */
      if (!token) {
        return sendResponse("You need to be loggedIn", res, 401);
      }
      const { location, city, state, address, userId } = req.body;
      res.send("Hello");
    }
  } catch (error) {
    sendResponse(error.message, res);
  }
};

module.exports = {
  registerCrime,
};
