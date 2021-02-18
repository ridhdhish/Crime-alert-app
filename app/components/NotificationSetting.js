import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { sectionStyle } from "../utils/sectionStyle";
import NotificationOptions from "./NotificationOptions";
import CustomButton from "../components/CustomButton";
import { colors } from "../colors";
import { setNotificationSetting } from "../store/actions/auth";

const NotificationSetting = ({ close }) => {
  const [notification, setNotification] = useState({
    allow: true,
    sound: true,
    vibrate: true,
    onSeenAlert: true,
    onSentAlert: true,
    onReceiveAlert: true,
    onAddedAsRelative: true,
  });
  const [isLoading, setIsLoading] = useState(false);

  const notificationSetting = useSelector(
    (state) => state.auth.user.notificationSetting
  );
  const dispatch = useDispatch();
  useEffect(() => {
    setNotification(notificationSetting);
  }, [notificationSetting]);

  return (
    <View>
      <Text
        style={{
          textAlign: "center",
          fontSize: 20,
          fontWeight: "bold",
          marginVertical: 10,
        }}
      >
        Sound and Notifications
      </Text>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notification</Text>
        <NotificationOptions
          title="Allow Notification"
          value={notification.allow}
          setValue={(value) =>
            setNotification((prev) => ({ ...prev, allow: value }))
          }
        />
        <NotificationOptions
          title="Notification on Alert"
          value={notification.onReceiveAlert}
          setValue={(value) =>
            setNotification((prev) => ({ ...prev, onReceiveAlert: value }))
          }
        />
        <NotificationOptions
          title="Notification on sent Alert"
          value={notification.onSentAlert}
          setValue={(value) =>
            setNotification((prev) => ({ ...prev, onSentAlert: value }))
          }
        />
        <NotificationOptions
          title="Notification on seen Alert"
          value={notification.onSeenAlert}
          setValue={(value) =>
            setNotification((prev) => ({ ...prev, onSeenAlert: value }))
          }
        />
        <NotificationOptions
          title="Notification on Added as Relative"
          value={notification.onAddedAsRelative}
          setValue={(value) =>
            setNotification((prev) => ({ ...prev, onAddedAsRelative: value }))
          }
        />
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Sounds</Text>
        <NotificationOptions
          title="Sound"
          value={notification.sound}
          setValue={(value) =>
            setNotification((prev) => ({ ...prev, sound: value }))
          }
        />
        <NotificationOptions
          title="Vibrate"
          value={notification.vibrate}
          setValue={(value) =>
            setNotification((prev) => ({ ...prev, vibrate: value }))
          }
        />
      </View>
      <Pressable
        onPress={async () => {
          setIsLoading(true);
          await dispatch(setNotificationSetting(notification));
          setIsLoading(false);
          close();
        }}
      >
        <CustomButton
          text={isLoading ? "Loading..." : "Save"}
          style={{
            padding: 5,
            backgroundColor: colors.backgroundSecondary,
            width: 120,
            borderRadius: 10,
            marginHorizontal: 10,
            marginLeft: "auto",
          }}
          touchableStyle={{
            padding: 8,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000001,
          }}
          textStyle={{
            color: colors.textSecondary,
          }}
        />
      </Pressable>
    </View>
  );
};
const styles = StyleSheet.create({
  ...sectionStyle,
});

export default NotificationSetting;
