import React, { Fragment, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Keyboard,
  Platform,
  Text,
  View,
} from "react-native";
import MapView, { Marker, Circle, Callout } from "react-native-maps";
import { useSelector, useDispatch } from "react-redux";
import { colors } from "../colors";
import FloatingButton from "../components/FloatingButton";
import { getAroundData, reportCrime } from "../store/actions/crime";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { getCrimeData } from "../utils/getCrimeData";
import { sendNotification } from "../utils/sendNotification";
import AlertButton from "../components/AlertButton";
import { useNotification } from "../hooks/useNotification";
import currentLocationImage from "../assets/images/currentLocation.png";
import CustomContentLoader from "../components/CustomContentLoader";
import { TextInput } from "react-native-gesture-handler";
import { getCriticalColor } from "../utils/getCriticalColor";

const HomeScreen = (props) => {
  const auth = useSelector((state) => state.auth);
  const crime = useSelector((state) => state.crime);
  const crimePlaces = useSelector((state) => state.crime.crimePlaces);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [markerPosition, setMarkerPosition] = useState(null);
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
      setMarkerPosition({
        latitude: crimeData.location.lat,
        longitude: crimeData.location.long,
      });
    }
    setLocation();
  }, []);

  useEffect(() => {
    if (markerPosition) {
      dispatch(
        getAroundData({
          lat: markerPosition.latitude,
          long: markerPosition.longitude,
        })
      );
    }
  }, [markerPosition]);

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
      setMarkerPosition({
        latitude: crimeData.location.lat,
        longitude: crimeData.location.long,
      });
      if (auth.isConnected) {
        sendNotification({
          title: "Sent Notification",
          body: "Alert has be reported successfully",
        });
      }
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
              left: 15,
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
          {JSON.stringify(markerPosition) !==
            JSON.stringify(currentLocation) && (
            <FloatingButton
              style={{
                bottom: 30,
                left: 15,
                width: 100,
                flexDirection: "row",
                elevation: 5,
                borderColor: colors.textSecondary,
                borderWidth: 1,
                paddingHorizontal: 5,
              }}
              onPress={() => setMarkerPosition(currentLocation)}
            >
              <MaterialIcons
                name="navigation"
                size={20}
                color={colors.textSecondary}
              />
              <Text style={{ color: colors.textSecondary }}>Recenter</Text>
            </FloatingButton>
          )}
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
          {currentLocation && markerPosition ? (
            <MapView
              style={{ flex: 1 }}
              region={{
                ...markerPosition,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              minZoomLevel={2}
              maxZoomLevel={20}
              mapType="terrain"
              zoomEnabled
              onPress={() => Keyboard.dismiss()}
            >
              <Marker
                draggable
                onDragEnd={(event) => {
                  // console.log(event.nativeEvent.coordinate);
                  setMarkerPosition(event.nativeEvent.coordinate);
                }}
                coordinate={{
                  ...markerPosition,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
                title="Surat"
                description="The city of Sun"
                // image={currentLocationImage}
              >
                <Callout>
                  <Text>You</Text>
                </Callout>
              </Marker>
              {crimePlaces.places.map((place) => (
                <Marker
                  key={place._id}
                  coordinate={{
                    latitude: place.location.lat,
                    longitude: place.location.long,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                  }}
                  title={place.address}
                  zIndex={1001}
                >
                  <Ionicons
                    name="ios-alert-circle"
                    color="rgba(255, 255, 0, 0.8)"
                    size={25}
                  />
                </Marker>
              ))}
              <Circle
                center={markerPosition}
                radius={3000}
                fillColor={getCriticalColor(
                  crimePlaces.places.length,
                  crimePlaces.totalCrimes
                )}
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
