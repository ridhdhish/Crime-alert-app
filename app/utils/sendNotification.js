import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";
import { colors } from "../colors";

export const sendNotification = async ({ title, body }) => {
  const userData = await JSON.parse(await AsyncStorage.getItem("userData"));
  if (
    userData.user.notificationSetting.allow &&
    userData.user.notificationSetting.onSentAlert
  ) {
    Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        color: colors.backgroundPrimary,
        vibrate: userData.user.notificationSetting.vibrate
          ? [200, 100, 200]
          : [],
        sound: userData.user.notificationSetting.sound,
      },
      trigger: {
        seconds: 3,
      },
    });
  }
};
