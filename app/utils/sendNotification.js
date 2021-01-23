import * as Notifications from "expo-notifications";
import { colors } from "../colors";

export const sendNotification = async ({ title, body }) => {
  Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
      color: colors.backgroundPrimary,
      vibrate: [200, 100, 200],
    },
    trigger: {
      seconds: 3,
    },
  });
};
