import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import env from "../environment";

export const getCrimeData = async () => {
  const hasLocationPermission = await Permissions.getAsync(
    Permissions.LOCATION
  );
  if (hasLocationPermission.granted) {
    const location = await Location.getCurrentPositionAsync();
    const result = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.coords.latitude},${location.coords.longitude}&key=${env.GOOGLE_MAPS_API_KEY}`
    );

    const data = await result.json();
    const crimeData = {
      location: {
        lat: location.coords.latitude,
        long: location.coords.longitude,
      },
      city: data.results[0].address_components.find(
        (field) => field.types[0] === "administrative_area_level_2"
      ).long_name,
      state: data.results[0].address_components.find(
        (field) => field.types[0] === "administrative_area_level_1"
      ).long_name,
      address: data.results[0].formatted_address,
    };

    return crimeData;
  } else {
    return null;
  }
};
