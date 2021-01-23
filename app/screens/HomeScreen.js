import React, { Fragment, useState } from "react";
import { ActivityIndicator, Dimensions, Platform } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useSelector, useDispatch } from "react-redux";
import { colors } from "../colors";
import FloatingButton from "../components/FloatingButton";
import { reportCrime } from "../store/actions/crime";
import * as Location from "expo-location";
import env from "../environment";
import { Ionicons } from "@expo/vector-icons";

const HomeScreen = (props) => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const reportCrimeData = async () => {
    setIsLoading(true);
    try {
      const location = await Location.getCurrentPositionAsync();
      const result = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.coords.latitude},${location.coords.longitude}&key=${env.GOOGLE_MAPS_API_KEY}`
      );

      console.log(location);

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
      dispatch(reportCrime(crimeData));
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
      setIsLoading(false);
    }
  };

  return (
    <Fragment>
      {!auth.user ? (
        <ActivityIndicator size="large" color={colors.backgroundPrimary} />
      ) : (
        <Fragment>
          <FloatingButton
            style={{
              top: 25,
              left: 20,
              zIndex: 1000,
              padding: 10,
              backgroundColor: colors.backgroundPrimary,
            }}
            onPress={() => props.navigation.toggleDrawer()}
          >
            <Ionicons
              size={30}
              name={Platform.OS === "android" ? "md-menu" : "ios-menu"}
              color={colors.textSecondary}
            />
          </FloatingButton>
          <MapView
            style={{ flex: 1 }}
            region={{
              latitude: 21.1702,
              longitude: 72.8311,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            maxZoomLevel={13}
          >
            <Marker
              coordinate={{
                latitude: 21.1702,
                longitude: 72.8311,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              title="Surat"
              description="The city of Sun"
            />
          </MapView>
          <FloatingButton
            style={{
              bottom: 50,
              left: Dimensions.get("window").width / 2 - 40,
              padding: 30,
              backgroundColor: colors.backgroundSecondary,
            }}
            onPress={isLoading ? () => {} : reportCrimeData}
          >
            {isLoading ? (
              <ActivityIndicator
                size="large"
                color={colors.backgroundPrimary}
              />
            ) : (
              <Ionicons
                size={30}
                name={
                  Platform.OS === "android" ? "md-megaphone" : "ios-megaphone"
                }
                color={colors.textSecondary}
              />
            )}
          </FloatingButton>
        </Fragment>
      )}
    </Fragment>
  );
};

export default HomeScreen;
