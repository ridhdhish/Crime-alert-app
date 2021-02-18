import { Linking, Platform } from "react-native";

export const openInMaps = (alert) => {
  const scheme = Platform.select({
    ios: "maps:0,0?q=",
    android: "geo:0,0?q=",
  });
  const latLng = `${alert.location.lat},${alert.location.long}`;
  const label = "Crime Location";
  const url = Platform.select({
    ios: `${scheme}${label}@${latLng}`,
    android: `${scheme}${latLng}(${label})`,
  });
  Linking.openURL(url);
};
