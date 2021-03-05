import dayjs from "dayjs";
import RelativeTime from "dayjs/plugin/relativeTime";
import React, { Fragment, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { colors } from "../colors";
import AlertDetails from "../components/AlertDetails";
import BottomPopup from "../components/BottomPopup";
import CustomButton from "../components/CustomButton";
import { me } from "../store/actions/auth";
import { seenAlert } from "../store/actions/crime";
import { openInMaps } from "../utils/openInMap";

dayjs.extend(RelativeTime);

const AlertScreen = (props) => {
  const [refreshing, setRefreshing] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const dispatch = useDispatch();

  const alerts = useSelector((state) =>
    state.auth.user.recentAlerts.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    )
  );

  const getText = (text) => {
    const textArray = text.toUpperCase().split(" ").slice(0, 2);
    return `${textArray[0][0]}${textArray[1][0]}`;
  };

  return (
    <Fragment>
      {alerts.length > 0 ? (
        <FlatList
          onRefresh={async () => {
            setRefreshing(true);
            await dispatch(me());
            setRefreshing(false);
          }}
          keyExtractor={(item) => item.crimeId}
          refreshing={refreshing}
          data={alerts}
          renderItem={({ item: alert }) => (
            <View
              style={{
                padding: 10,
                backgroundColor: !alert.isSeen
                  ? "rgba(242, 145, 60, 0.3)"
                  : "white",
                flexDirection: "row",
                margin: 5,
                borderRadius: 10,
              }}
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
                  {getText(alert.title)}
                </Text>
              </View>
              <View
                style={{
                  marginHorizontal: 10,
                }}
              >
                <Text style={{ fontSize: 16 }}>
                  {alert.title.split(",")[0]}
                </Text>
                <Text
                  style={{
                    marginVertical: 3,
                    color: "rgba(0, 0, 0, 0.5)",
                  }}
                >
                  {dayjs(alert.createdAt).fromNow()}
                </Text>
                {!alert.location && (
                  <Text>Location of crime is not provided.</Text>
                )}
                <View
                  style={{
                    flexDirection: "row",
                    marginVertical: 5,
                  }}
                >
                  {alert.location && (
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
                      onPress={async () => {
                        openInMaps(alert);
                        if (!alert.isSeen) {
                          await dispatch(seenAlert(alert));
                        }
                      }}
                    />
                  )}
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
                    onPress={async () => {
                      setShowDetails(true);
                      if (!alert.isSeen) {
                        await dispatch(seenAlert(alert));
                      }
                    }}
                  />
                  {showDetails && (
                    <BottomPopup
                      modalVisible={showDetails}
                      closeModal={() => {
                        setShowDetails(false);
                      }}
                    >
                      <AlertDetails alert={alert} />
                    </BottomPopup>
                  )}
                </View>
              </View>
            </View>
          )}
        />
      ) : (
        <Text
          style={{
            textAlign: "center",
            marginTop: 20,
          }}
        >
          No Alerts
        </Text>
      )}
    </Fragment>
  );
};

export default AlertScreen;
