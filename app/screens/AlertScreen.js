import React from "react";
import { Button, ScrollView, Text, View } from "react-native";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import RelativeTime from "dayjs/plugin/relativeTime";
import { colors } from "../colors";
import CustomButton from "../components/CustomButton";

dayjs.extend(RelativeTime);

const AlertScreen = (props) => {
  const alerts = useSelector((state) =>
    state.auth.user.recentAlerts.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    )
  );

  return (
    <ScrollView>
      {alerts.length > 0 ? (
        alerts.map((alert) => (
          <View
            style={{
              padding: 10,
              borderBottomColor: "rgba(0, 0, 0, 0.1)",
              borderBottomWidth: 2,
              backgroundColor: alert.isSeen
                ? "rgba(242, 145, 60, 0.2)"
                : "white",
              flexDirection: "row",
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
                  onPress={() => {}}
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
