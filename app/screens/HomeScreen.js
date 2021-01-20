import React, { Fragment } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Platform,
  Text,
  TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";
import { colors } from "../colors";
import MapView, { Marker } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";

const HomeScreen = (props) => {
  const auth = useSelector((state) => state.auth);
  return (
    <Fragment>
      {!auth.user ? (
        <ActivityIndicator size="large" color={colors.backgroundPrimary} />
      ) : (
        <Fragment>
          <TouchableOpacity
            style={{
              position: "absolute",
              top: 25,
              left: 20,
              zIndex: 1000,
              padding: 10,
              backgroundColor: colors.backgroundPrimary,
              borderRadius: 100,
            }}
            activeOpacity={0.8}
            onPress={() => props.navigation.toggleDrawer()}
          >
            <Ionicons
              size={30}
              name={Platform.OS === "android" ? "md-menu" : "ios-menu"}
              color={colors.textSecondary}
            />
          </TouchableOpacity>
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
          <TouchableOpacity
            style={{
              position: "absolute",
              bottom: 50,
              left: Dimensions.get("window").width / 2 - 40,
              zIndex: 1000,
              padding: 30,
              backgroundColor: colors.backgroundSecondary,
              borderRadius: 100,
            }}
            activeOpacity={0.8}
            onPress={() => {}}
          >
            <Ionicons
              size={30}
              name={
                Platform.OS === "android" ? "md-megaphone" : "ios-megaphone"
              }
              color={colors.textSecondary}
            />
          </TouchableOpacity>
        </Fragment>
      )}
    </Fragment>
  );
};

export default HomeScreen;
