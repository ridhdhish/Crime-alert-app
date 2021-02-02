import React, { Fragment, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Keyboard,
  Platform,
  Text,
  View,
} from "react-native";
import MapView, { Marker, Circle } from "react-native-maps";
import { useSelector, useDispatch } from "react-redux";
import { colors } from "../colors";
import FloatingButton from "../components/FloatingButton";
import { getAroundData, reportCrime } from "../store/actions/crime";
import { Ionicons } from "@expo/vector-icons";
import { getCrimeData } from "../utils/getCrimeData";
import { sendNotification } from "../utils/sendNotification";
import AlertButton from "../components/AlertButton";
import { useNotification } from "../hooks/useNotification";
import currentLocationImage from "../assets/images/currentLocation.png";
import CustomContentLoader from "../components/CustomContentLoader";
import { TextInput } from "react-native-gesture-handler";

const HomeScreen = (props) => {
  const auth = useSelector((state) => state.auth);
  const crimePlaces = useSelector((state) => state.crime.crimePlaces);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [addCrimeData, setAddCrimeData] = useState(false);
  const [crimeDataText, setCrimeDataText] = useState("");

  useNotification();

  useEffect(() => {
    async function setLocation() {
      const crimeData = await getCrimeData();
      setCurrentLocation({
        latitude: crimeData.location.lat,
        longitude: crimeData.location.long,
      });
    }
    setLocation();
  }, []);

  useEffect(() => {
    if (currentLocation) {
      dispatch(
        getAroundData({
          lat: currentLocation.latitude,
          long: currentLocation.longitude,
        })
      );
    }
  }, [currentLocation]);

  const reportCrimeData = async () => {
    setIsLoading(true);
    try {
      const crimeData = await getCrimeData();
      dispatch(reportCrime({ ...crimeData, crimeData: crimeDataText }));
      setCrimeDataText("");
      setAddCrimeData(false);
      setCurrentLocation({
        latitude: crimeData.location.lat,
        longitude: crimeData.location.long,
      });
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
              left: 20,
              top: 25,
            }}
            onPress={() => props.navigation.toggleDrawer()}
          >
            <Ionicons
              size={30}
              name={Platform.OS === "android" ? "md-menu" : "ios-menu"}
              color={colors.textSecondary}
            />
          </FloatingButton>
          <FloatingButton
            style={{
              right: 80,
              top: 25,
            }}
            onPress={() => setAddCrimeData(!addCrimeData)}
          >
            <Ionicons
              size={30}
              name={
                Platform.OS === "android"
                  ? "md-document-text"
                  : "ios-document-text"
              }
              color={colors.textSecondary}
            />
          </FloatingButton>
          <FloatingButton
            style={{
              right: 20,
              top: 25,
            }}
          >
            <Ionicons
              size={30}
              name={
                Platform.OS === "android"
                  ? "md-notifications"
                  : "ios-notifications"
              }
              color={colors.textSecondary}
            />
            {auth.user?.recentAlerts?.length > 0 && (
              <View
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  padding: 5,
                  backgroundColor: colors.backgroundSecondary,
                  borderRadius: 50,
                  height: 15,
                  width: 15,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 8,
                    fontWeight: "bold",
                    color: colors.textSecondary,
                  }}
                >
                  {auth.user?.recentAlerts?.length}
                </Text>
              </View>
            )}
          </FloatingButton>
          {addCrimeData && (
            <View
              style={{
                width: "80%",
                position: "absolute",
                zIndex: 1000,
                top: 100,
                left: 0,
                marginHorizontal: "10%",
                backgroundColor: "rgba(191, 116, 89, 0.9)",
                padding: 10,
                borderRadius: 10,
              }}
            >
              <TextInput
                placeholder="Crime Detail"
                placeholderTextColor="#ddd"
                style={{ color: colors.textSecondary }}
                autoFocus
                numberOfLines={2}
                value={crimeDataText}
                onChangeText={(text) => setCrimeDataText(text)}
              />
            </View>
          )}

          {currentLocation ? (
            <MapView
              style={{ flex: 1 }}
              region={{
                ...currentLocation,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              minZoomLevel={2}
              maxZoomLevel={12}
              zoomEnabled
              onPress={() => Keyboard.dismiss()}
            >
              <Marker
                draggable
                coordinate={{
                  ...currentLocation,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
                title="Surat"
                description="The city of Sun"
                // image={currentLocationImage}
              />
              <Circle
                center={currentLocation}
                radius={5000}
                fillColor={"rgba(255, 0, 0, 0.5)"}
                strokeWidth={0}
              />
            </MapView>
          ) : (
            <CustomContentLoader map />
          )}
          <AlertButton loading={isLoading} reportCrimeData={reportCrimeData} />
        </Fragment>
      )}
    </Fragment>
  );
};

export default HomeScreen;
