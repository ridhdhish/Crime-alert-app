import React, { Fragment, useEffect, useState } from "react";
import { ActivityIndicator, Alert, Platform } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useSelector, useDispatch } from "react-redux";
import { colors } from "../colors";
import FloatingButton from "../components/FloatingButton";
import { reportCrime } from "../store/actions/crime";
import { Ionicons } from "@expo/vector-icons";
import * as Notifications from "expo-notifications";
import { getCrimeData } from "../utils/getCrimeData";
import { sendNotification } from "../utils/sendNotification";
import AlertButton from "../components/AlertButton";
import { useNotification } from "../hooks/useNotification";

const HomeScreen = (props) => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  useNotification();

  const reportCrimeData = async () => {
    setIsLoading(true);
    try {
      const crimeData = await getCrimeData();
      dispatch(reportCrime(crimeData));
      sendNotification({
        title: "Sent Notification",
        body: "Alert has be reported successfully",
      });
    } catch (error) {
      console.log(error.message);
      Alert.alert("Error", error.message, [{ text: "Okay" }]);
    } finally {
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
          <AlertButton loading={isLoading} reportCrimeData={reportCrimeData} />
        </Fragment>
      )}
    </Fragment>
  );
};

export default HomeScreen;
