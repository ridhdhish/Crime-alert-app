exports.getDistanceFromLatLonInKm = ({ lat1, long1, lat2, long2 }) => {
  var RadiusOfEarthKms = 6371;
  var degreeLat = degree2Radian(lat2 - lat1);
  var degreeLon = degree2Radian(long2 - long1);
  var a =
    Math.sin(degreeLat / 2) * Math.sin(degreeLat / 2) +
    Math.cos(degree2Radian(lat1)) *
      Math.cos(degree2Radian(lat2)) *
      Math.sin(degreeLon / 2) *
      Math.sin(degreeLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var distance = RadiusOfEarthKms * c; // Distance in km
  return distance;
};

function degree2Radian(deg) {
  return deg * (Math.PI / 180);
}
