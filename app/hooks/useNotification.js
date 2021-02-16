import { useEffect } from "react";
import * as Notifications from "expo-notifications";
import { useDispatch } from "react-redux";
import { me } from "../store/actions/auth";
import { useNavigation } from "@react-navigation/native";

export const useNotification = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    const foregroundSubscription = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log("fg notification");
        dispatch(me());
      }
    );

    const dropSubscription = Notifications.addNotificationsDroppedListener(
      (notification) => {
        console.log("Notification Dropped");
      }
    );

    const backgroundSubscription = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log("Bg Notification");
        dispatch(me());
        navigation.navigate("Alerts");
      }
    );

    return () => {
      foregroundSubscription.remove();
      backgroundSubscription.remove();
      dropSubscription.remove();
    };
  }, []);
};
