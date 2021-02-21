import React, { Fragment, useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  Linking,
  TouchableOpacity,
  Platform,
  StyleSheet,
} from "react-native";
import dayjs from "dayjs";
import RelativeTime from "dayjs/plugin/relativeTime";
import env from "../environment";
import { useSelector } from "react-redux";
import { colors } from "../colors";
import { Ionicons } from "@expo/vector-icons";
import MapView, { Marker } from "react-native-maps";
import { openInMaps } from "../utils/openInMap";

dayjs.extend(RelativeTime);

const AlertDetails = ({ alert }) => {
  const [userData, setUserData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const getUserData = async () => {
      setIsLoading(true);
      const response = await fetch(`${env.API_URL}/user/${alert.senderId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          Accepts: "application/json",
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setUserData(data.message);
      setIsLoading(false);
    };
    getUserData();
  }, []);

  return (
    <View>
      <Text
        style={{
          marginVertical: 15,
          fontSize: 24,
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        Alert Details
      </Text>
      {isLoading ? (
        <ActivityIndicator size="large" color={colors.backgroundPrimary} />
      ) : (
        <Fragment>
          {userData && (
            <Fragment>
              <Text
                style={{
                  fontSize: 18,
                  textAlign: "center",
                }}
              >
                {alert.title}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  textAlign: "center",
                }}
              >
                {dayjs(alert.createdAt).fromNow()} at{" "}
                {dayjs(alert.createdAt).format("hh:mmA")}
              </Text>
              {alert.location ? (
                <MapView
                  style={{
                    width: "90%",
                    height: 200,
                    marginHorizontal: "5%",
                    marginVertical: 10,
                    borderRadius: 10,
                  }}
                  region={{
                    latitude: alert.location.lat,
                    longitude: alert.location.long,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                  }}
                  maxZoomLevel={30}
                  zoomEnabled
                  mapType="terrain"
                  onPress={() => openInMaps(alert)}
                >
                  <Marker
                    coordinate={{
                      latitude: alert.location.lat,
                      longitude: alert.location.long,
                      latitudeDelta: 0.0922,
                      longitudeDelta: 0.0421,
                    }}
                  />
                </MapView>
              ) : (
                <Text style={{ textAlign: "center" }}>
                  Location of crime is not provided by your friend
                </Text>
              )}
              <Text
                style={{
                  textAlign: "center",
                }}
              >
                Contact to Crime location near by police station
              </Text>

              <TouchableOpacity
                style={styles.contactButton}
                onPress={() =>
                  Linking.openURL(
                    Platform.OS === "ios"
                      ? `telprompt:${userData.mobileNumber}`
                      : `tel:${userData.mobileNumber}`
                  )
                }
              >
                <Text
                  style={{
                    color: colors.textSecondary,
                    marginHorizontal: 5,
                  }}
                >
                  Contact {alert.title.split(" ").slice(0, 2).join(" ")}
                </Text>
                <Ionicons
                  size={18}
                  name="md-call"
                  color={colors.textSecondary}
                />
              </TouchableOpacity>
            </Fragment>
          )}
        </Fragment>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  contactButton: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
    padding: 10,
    backgroundColor: colors.backgroundPrimary,
    borderRadius: 10,
    alignItems: "center",
    width: "70%",
    marginHorizontal: "15%",
  },
});

export default AlertDetails;
