const Place = require("../models/place");
const sendResponse = require("../config/showError");
const { getDistanceFromLatLonInKm } = require("../utils");

/**
 * This will return all places that are registered with crime
 * Improve this according to user location
 */
const getAllPlaces = async (req, res) => {
  const {
    params: { id },
  } = req;
  let placeOfId;
  try {
    let places;
    if (id === "*") {
      places = await Place.find({});
    } else {
      placeOfId = await Place.findById(id);
      if (!placeOfId) {
        sendResponse("No place found", res, 404);
      }
      places = (await Place.find({})).filter(
        (place) =>
          getDistanceFromLatLonInKm({
            lat1: place.location.lat,
            long1: place.location.long,
            lat2: placeOfId.location.lat,
            long2: placeOfId.location.lat,
          }) < 50
      );
    }

    sendResponse(
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

const getOnePlace = async (req, res) => {};

module.exports = {
  getAllPlaces,
  getOnePlace,
};
