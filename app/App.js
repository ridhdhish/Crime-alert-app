import React, { useEffect } from "react";
import { Alert, StatusBar, StyleSheet, View } from "react-native";
import { Provider } from "react-redux";
import { applyMiddleware, combineReducers, createStore } from "redux";
import Thunk from "redux-thunk";
import AppNavigator from "./navigation/AppNavigator";
import { authReducer } from "./store/reducers/auth";
import { crimeReducer } from "./store/reducers/crime";
import * as Permissions from "expo-permissions";
import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldShowAlert: true,
      priority: Notifications.AndroidNotificationPriority.MAX,
    };
  },
});

const rootReducer = combineReducers({
  auth: authReducer,
  crime: crimeReducer,
});

const store = createStore(rootReducer, applyMiddleware(Thunk));

export default function App() {
  useEffect(() => {
    // LogBox.ignoreLogs(["Setting a timer"]);
    (async function askPermissions() {
      const permissions = [Permissions.LOCATION, Permissions.NOTIFICATIONS];
      try {
        const statusData = await Permissions.getAsync(...permissions);
        if (statusData.status !== "granted") {
          const result = await Permissions.askAsync(...permissions);
          console.log(result.status);
          if (result.status !== "granted") {
            Alert.alert(
              "Permission Required",
              "To report crime you need to provide the location & notification Permission, you can do it by going to App settings",
              [
                {
                  text: "Okay",
                },
              ]
            );
            return;
          }
        }
        /**
         * Get push token
         */
        const token = await Notifications.getExpoPushTokenAsync();
        AsyncStorage.setItem("pushToken", JSON.stringify(token.data));
        console.log(token);
      } catch (error) {
        console.log(error.message);
      }
    })();
  }, []);

  return (
    <Provider store={store}>
      <View style={styles.container}>
        <AppNavigator />
        <StatusBar
          translucent={true}
          barStyle="dark-content"
          backgroundColor="rgba(0, 0, 0, 0.1)"
          hidden
        />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
