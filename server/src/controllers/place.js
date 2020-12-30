const Place = require("../models/place");
const sendResponse = require("../config/showError");
const { getDistanceFromLatLonInKm } = require("../utils");

/**
 * This will return all places that are registered with crime
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
        return sendResponse("No place found", 404);
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
      200
    );
  } catch (error) {
    sendResponse(error.message);
  }
};

const getOnePlace = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const place = await Place.findById(id);
    if (!place) {
      return sendResponse("Place not found", 404);
    }
    sendResponse({ place }, 200);
  } catch (error) {
    sendResponse(error.message);
  }
};

module.exports = {
  getAllPlaces,
  getOnePlace,
};
