import React, { Fragment } from "react";
import { ActivityIndicator, Dimensions, Platform } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useSelector, useDispatch } from "react-redux";
import { colors } from "../colors";
import FloatingButton from "../components/FloatingButton";
import { reportCrime } from "../store/actions/crime";
import * as Location from "expo-location";

const HomeScreen = (props) => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const reportCrimeData = async () => {
    try {
      const location = await Location.getCurrentPositionAsync();
      console.log(location);
      console.log(process.env);
      // fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key${process.env.GOOGLE_MAPS_API_KEY}`)
      // dispatch(reportCrime())
    } catch (error) {
      console.log(error.message);
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
            size={30}
            name={Platform.OS === "android" ? "md-menu" : "ios-menu"}
          />
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
            onPress={reportCrimeData}
            size={30}
            name={Platform.OS === "android" ? "md-megaphone" : "ios-megaphone"}
          />
        </Fragment>
      )}
    </Fragment>
  );
};

export default HomeScreen;
