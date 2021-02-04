const Place = require("../models/place");
const Crime = require("../models/crime");
const sendResponse = require("../utils/sendResponse");
const { getDistanceFromLatLonInKm } = require("../utils/getLatLongDistance");
const {
  getLatLongDifferenceFromKms,
} = require("../utils/getLatLongMinusNumberFromKms");
const { validationResult } = require("express-validator");

/**
 * This will query all places that are registered with crime
 * Improve this according to user location
 */
const getAllPlaces = async (req, res) => {
  const {
    params: { id, kms },
  } = req;
  let placeOfId;
  try {
    let places;
    if (id === "*") {
      places = await Place.find({});
    } else {
      placeOfId = await Place.findById(id);
      if (!placeOfId) {
        return sendResponse("No place found", res, 404);
      }
      places = (await Place.find({})).filter(
        (place) =>
          getDistanceFromLatLonInKm({
            lat1: place.location.lat,
            long1: place.location.long,
            lat2: placeOfId.location.lat,
            long2: placeOfId.location.lat,
          }) < +kms
      );
    }

    return sendResponse(
      {
        aroundPlaces: places,
        place: placeOfId,
      },
      res,
      200
    );
  } catch (error) {
    sendResponse(error.message, res);
  }
};

/**
 * @Doubt
 */
const getCurrentLocationAroundPlaces = async (req, res) => {
  const { city, lat, long, kms } = req.query;

  try {
    let places;
    const totalCrimes = await Crime.countDocuments();
    const placesData = await Place.find({});
    if (city) {
      places = await Place.find({
        $or: [
          { city },
          { city: city.toUpperCase() },
          { city: city.charAt(0).toUpperCase() + city.slice(1) },
        ],
      });
      return sendResponse(places, res, 200);
    }
    if (!places) {
      let difference = 0.025;
      if (kms) {
        difference = +getLatLongDifferenceFromKms(+kms * 2);
      }
      places = await Place.aggregate([
        {
          $match: {
            "location.lat": {
              $lte: +lat + difference,
              $gte: +lat - difference,
            },
            "location.long": {
              $lte: +long + difference,
              $gte: +long - difference,
            },
          },
        },
      ]);
      console.log(places);
      sendResponse({ places, totalCrimes }, res, 200);
    }
  } catch (error) {
    sendResponse(error.message, res);
  }
};

const getOnePlace = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const place = await Place.findById(id);
    if (!place) {
      return sendResponse("Place not found", res, 404);
    }
    sendResponse({ place }, res, 200);
  } catch (error) {
    sendResponse(error.message, res);
  }
};

/**
 * Most probably for development only
 */
const addPlace = async (req, res) => {
  const {
    body: { location, state, city, address },
  } = req;
  try {
    const place = new Place({
      location,
      state,
      city,
      address,
    });

    await place.save();
    sendResponse({ place }, res, 200);
  } catch (error) {
    sendResponse(error.message, res);
  }
};

const addPlaceCrimeStatus = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return sendResponse(errors.array(), res, 400);
  }
  console.log(req.body);
  const {
    body: { id, crimeStatus },
  } = req;
  try {
    if (
      typeof crimeStatus.level === "undefined" ||
      typeof crimeStatus.keyword === "undefined"
    ) {
      return sendResponse("Please Provide all data", res, 400);
    }
    const place = await Place.findById(id);
    if (!place) {
      return sendResponse("Place not found", res, 404);
    }
    place.crimeStatus.push(crimeStatus);
    await place.save();

    sendResponse({ place }, res, 200);
  } catch (error) {
    sendResponse(error.message, res);
  }
};

module.exports = {
  getAllPlaces,
  getOnePlace,
  addPlace,
  addPlaceCrimeStatus,
  getCurrentLocationAroundPlaces,
};
