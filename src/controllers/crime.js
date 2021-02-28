const { validationResult } = require("express-validator");
const Crime = require("../models/crime");
const Place = require("../models/place");
const Relative = require("../models/relative");
const User = require("../models/user");
const Police = require("../models/police");
const sendResponse = require("../utils/sendResponse");
const jwt = require("jsonwebtoken");
const { sendMail } = require("../utils/sendMail");
const keyValueDb = require("../models/keyValueDb");
const { SECRET_TOKEN_PREFIX } = require("../config/constant");
const { Expo } = require("expo-server-sdk");
const { sendPushNotification } = require("../utils/sendPushNotification");
const { getDistanceFromLatLonInKm } = require("../utils/getLatLongDistance");

const registerCrime = async (req, res) => {
  let userId;
  let sender;
  const authHeader = req.get("Authorization");
  try {
    /**
     * user is not authenticated but need help
     * need to get one token to report spam
     */
    if (!authHeader) {
      const { secretToken } = req.body;
      if (!secretToken) {
        return sendResponse("Don't try to make fake alerts", res, 401);
      }
      const user = await keyValueDb.findOne({
        key: `${SECRET_TOKEN_PREFIX}${secretToken}`,
      });
      if (!user) {
        return sendResponse("Don't try to make fake alerts", res, 401);
      }
      sender = user.value;
      userId = user.value._id;

      /**
       * user is authenticated and need help
       */
    } else {
      const token = authHeader.split(" ")[1];
      if (!token) {
        return sendResponse("Don't try to make fake alerts", res, 401);
      }
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      if (!decodedToken) {
        return res.status(401).json({
          message: "Don't try to make fake alerts",
        });
      }
      sender = await User.findById(decodedToken.user.id);
      userId = decodedToken.user.id;
    }

    if (!userId) {
      return sendResponse("Unable to send crime report", res);
    }

    const { location, city, state, address } = req.body;
    const place = new Place({
      location: location ? location : {},
      city: city ? city.toLowerCase() : "",
      state: state ? state.toLowerCase() : "",
      address: address ? address.toLowerCase() : "",
    });
    await place.save();

    const crime = new Crime({
      userId,
      placeId: place.id,
    });

    if (req.body.crimeData) {
      crime.crimeData = req.body.crimeData;
    }

    await crime.save();

    /**
     * @Todo
     * bluetooth near by
     * send message, call to relative
     */

    const policeNearBy = await Police.aggregate([
      {
        $match: {
          "location.lat": {
            $lte: +place.location.lat + 0.05,
            $gte: +place.location.lat - 0.05,
          },
          "location.long": {
            $lte: place.location.long + 0.05,
            $gte: place.location.long - 0.05,
          },
        },
      },
    ]);

    if (policeNearBy) {
      const sortedByDistance = policeNearBy.sort(
        (a, b) =>
          getDistanceFromLatLonInKm({
            lat1: place.location.lat,
            long1: place.location.long,
            lat2: a.location.lat,
            long2: a.location.long,
          }) -
          getDistanceFromLatLonInKm({
            lat1: place.location.lat,
            long1: place.location.long,
            lat2: b.location.lat,
            long2: b.location.long,
          })
      );
      if (sortedByDistance[0]) {
        await sendPushNotification({
          body: `${sender.firstname} ${sender.lastname} needs your help`,
          data: {
            username: "User's name who sent the alert",
          },
          pushToken: sortedByDistance[0].pushToken,
          subtitle: `${place.address && "near " + place.address}`,
          title: "Need Help",
        });
        const policeStation = await Police.findById(sortedByDistance[0]._id);
        policeStation.recentAlerts.push({
          title: `${sender.firstname} ${sender.lastname} needs your help, ${
            crime.crimeData ? crime.crimeData : ""
          }`,
          crimeId: crime.id,
          senderId: sender._id,
          location: {
            lat: place.location.lat,
            long: place.location.long,
          },
          createdAt: Date.now(),
        });
        await policeStation.save();
      }
    }

    let relatives = await Relative.find({ userId });
    relatives = relatives.sort((a, b) => +a.priority - +b.priority);

    const pushRelatives = relatives
      .filter(
        (relative) =>
          relative.pushToken && Expo.isExpoPushToken(relative.pushToken)
      )
      .slice(0, 3);
    const mailRelatives = relatives.slice(0, 3);

    await Promise.all(
      pushRelatives.map(async (rel) => {
        const user = await User.findById(rel.existingUserId);
        if (user) {
          user.recentAlerts.push({
            title: `${sender.firstname} ${sender.lastname} needs your help, ${
              crime.crimeData ? crime.crimeData : ""
            }`,
            crimeId: crime.id,
            senderId: sender._id,
            location: {
              lat: place.location.lat,
              long: place.location.long,
            },
            createdAt: Date.now(),
          });
          await user.save();
        }
        if (
          user.notificationSetting.allow &&
          user.notificationSetting.onReceiveAlert
        ) {
          await sendPushNotification({
            body: `${sender.firstname} ${sender.lastname} needs your help`,
            data: {
              username: "User's name who sent the alert",
            },
            pushToken: rel.pushToken,
            subtitle: `${place.address && "near " + place.address}`,
            title: "Need Help",
          });
        }

        return rel;
      })
    );
    await Promise.all(
      mailRelatives.map(async (rel) => await sendMail(rel.email))
    );
    sendResponse(
      {
        message: "Crime reported successfully",
        crime,
        place,
      },
      res,
      200,
      false
    );
  } catch (error) {
    sendResponse(error.message, res);
  }
};

const seenCrime = async (req, res) => {
  const { crimeId } = req.params;
  try {
    const userData = await User.findById(req.user.id);
    const alert = await userData.recentAlerts.find(
      (alert) => alert.crimeId.toString() === crimeId
    );
    if (alert) {
      alert.isSeen = true;
      await userData.save();

      const user = await User.findById(alert.senderId);
      if (
        user &&
        user.notificationSetting.allow &&
        user.notificationSetting.onSeenAlert
      ) {
        await sendPushNotification({
          body: `${userData.firstname} ${userData.lastname} had seen your alert`,
          data: {
            username: "User's name who seen the alert",
          },
          pushToken: user.pushToken,
          title: "Seen Alert",
        });
        return sendResponse("Crime had seen", res, 200);
      } else {
        return sendResponse("No user found", res, 404);
      }
    }
    sendResponse("No crime found", res, 404);
  } catch (error) {
    sendResponse(error.message, res);
  }
};

const policeSeenCrime = async (req, res) => {
  const { crimeId, policeId } = req.params;
  try {
    const userData = await Police.findById(policeId);
    const alert = await userData.recentAlerts.find(
      (alert) => alert.crimeId.toString() === crimeId
    );
    if (alert) {
      alert.isSeen = true;
      await userData.save();

      const user = await User.findById(alert.senderId);
      if (user) {
        await sendPushNotification({
          body: `${userData.name} police station had seen your alert`,
          data: {
            username: "User's name who seen the alert",
          },
          pushToken: user.pushToken,
          title: "Seen Alert",
        });
        return sendResponse("Crime had seen", res, 200);
      } else {
        return sendResponse("No user found", res, 404);
      }
    }
    sendResponse("No crime found", res, 404);
  } catch (error) {
    sendResponse(error.message, res);
  }
};

module.exports = {
  registerCrime,
  seenCrime,
  policeSeenCrime,
};
