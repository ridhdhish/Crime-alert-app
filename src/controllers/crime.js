const { validationResult } = require("express-validator");
const Crime = require("../models/crime");
const Place = require("../models/place");
const Relative = require("../models/relative");
const sendResponse = require("../utils/sendResponse");
const jwt = require("jsonwebtoken");
const { sendMail } = require("../utils/sendMail");

const registerCrime = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return sendResponse(errors.array(), res, 400);
  }

  const authHeader = req.get("Authorization");
  try {
    //user is not authenticated but need help
    // need to get one token to report spam
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
        return sendResponse("Don't try to make fake alerts", res, 401);
      }
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      if (!decodedToken) {
        return res.status(401).json({
          message: "Don't try to make fake alerts",
        });
      }
      const { location, city, state, address } = req.body;
      const place = new Place({
        location,
        city,
        state,
        address,
      });
      await place.save();

      const crime = new Crime({
        userId: decodedToken.user.id,
        placeId: place.id,
      });

      await crime.save();

      /**
       * @Todo
       * Send notification to relative, bluetooth near by
       * Send crime to police
       * send message, mail, call to relative
       */

      const relatives = await Relative.find({ userId: decodedToken.user.id });

      relatives.forEach(async (rel) => {
        await sendMail(rel.email, `Mail sent`);
      });
      sendResponse(
        {
          message: "Crime reported successfully",
          crime,
          place,
        },
        res,
        200
      );
    }
  } catch (error) {
    sendResponse(error.message, res);
  }
};

module.exports = {
  registerCrime,
};
