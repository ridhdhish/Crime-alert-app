import { useEffect } from "react";
import * as Notifications from "expo-notifications";
import { useDispatch, useSelector } from "react-redux";
import { me } from "../store/actions/auth";
import { useNavigation } from "@react-navigation/native";
import { refreshPoliceData } from "../store/actions/police";

export const useNotification = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const isPolice = useSelector((state) => state.auth.isPolice);

  useEffect(() => {
    const foregroundSubscription = Notifications.addNotificationReceivedListener(
      (notification) => {
        if (isPolice) {
          dispatch(refreshPoliceData());
        } else {
          dispatch(me());
        }
      }
    );

    const dropSubscription = Notifications.addNotificationsDroppedListener(
      (notification) => {
        console.log("Notification Dropped");
      }
    );

    const backgroundSubscription = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        if (isPolice) {
          dispatch(refreshPoliceData());
        } else {
          dispatch(me());
        }
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
