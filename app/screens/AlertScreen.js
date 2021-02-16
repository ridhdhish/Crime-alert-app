import React, { useState } from "react";
import {
  Linking,
  Platform,
  ScrollView,
  Text,
  View,
  RefreshControl,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import RelativeTime from "dayjs/plugin/relativeTime";
import { colors } from "../colors";
import CustomButton from "../components/CustomButton";
import { me } from "../store/actions/auth";

dayjs.extend(RelativeTime);

const AlertScreen = (props) => {
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useDispatch();

  const alerts = useSelector((state) =>
    state.auth.user.recentAlerts.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    )
  );

  const openInMaps = (alert) => {
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

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          onRefresh={() => {
            setRefreshing(true);
            dispatch(me());
            setRefreshing(false);
          }}
          refreshing={refreshing}
        />
      }
    >
      {alerts.length > 0 ? (
        alerts.map((alert) => (
          <View
            style={{
              padding: 10,
              borderBottomColor: "rgba(0, 0, 0, 0.1)",
              borderBottomWidth: !alert.isSeen ? 0 : 2,
              backgroundColor: !alert.isSeen
                ? "rgba(242, 145, 60, 0.3)"
                : "white",
              flexDirection: "row",
              margin: 5,
              borderRadius: 10,
            }}
            key={alert.crimeId}
          >
            <View
              style={{
                backgroundColor: colors.backgroundExtra,
                width: 50,
                height: 50,
                borderRadius: 50,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 5,
              }}
            >
              <Text
                style={{
                  color: colors.textSecondary,
                }}
              >
                MD
              </Text>
            </View>
            <View
              style={{
                marginHorizontal: 10,
              }}
            >
              <Text style={{ fontSize: 18 }}>{alert.title}</Text>
              <Text
                style={{
                  marginVertical: 3,
                  color: "rgba(0, 0, 0, 0.5)",
                }}
              >
                {dayjs(alert.createdAt).fromNow()}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  marginVertical: 5,
                }}
              >
                <CustomButton
                  text="Crime Location"
                  style={{
                    backgroundColor: colors.backgroundSecondary,
                    borderRadius: 5,
                    marginRight: 5,
                  }}
                  touchableStyle={{
                    padding: 8,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                  textStyle={{
                    color: colors.textSecondary,
                  }}
                  onPress={() => openInMaps(alert)}
                />
                <CustomButton
                  text="Details"
                  style={{
                    borderColor: colors.backgroundSecondary,
                    borderRadius: 5,
                    borderWidth: 2,
                  }}
                  touchableStyle={{
                    padding: 8,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                  textStyle={{
                    color: colors.backgroundSecondary,
                  }}
                  onPress={() => {}}
                />
              </View>
            </View>
          </View>
        ))
      ) : (
        <Text>No Alerts</Text>
      )}
    </ScrollView>
  );
};

export default AlertScreen;
