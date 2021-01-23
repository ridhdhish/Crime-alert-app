import { useEffect } from "react";
import * as Notifications from "expo-notifications";

export const useNotification = () => {
  useEffect(() => {
    const foregroundSubscription = Notifications.addNotificationReceivedListener(
      (notification) => {
        // console.log(notification);
      }
    );

    const backgroundSubscription = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        // console.log(response);
      }
    );

    return () => {
      foregroundSubscription.remove();
      backgroundSubscription.remove();
    };
  }, []);
};
