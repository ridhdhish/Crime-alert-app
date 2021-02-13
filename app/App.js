import React, { useEffect, useRef, useState } from "react";
import { Alert, StatusBar, StyleSheet, View } from "react-native";
import { Provider, useDispatch } from "react-redux";
import { applyMiddleware, combineReducers, createStore } from "redux";
import Thunk from "redux-thunk";
import AppNavigator from "./navigation/AppNavigator";
import { authReducer } from "./store/reducers/auth";
import { crimeReducer } from "./store/reducers/crime";
import { relativeReducer } from "./store/reducers/relative";
import * as Permissions from "expo-permissions";
import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";
import { initCrimeDB } from "./utils/SQLiteQueries";
import { setConnectedToInternet, setLoadedData } from "./store/actions/auth";
import { doBackgroundSync } from "./store/actions/crime";

initCrimeDB()
  .then(() => console.log("Db has been created successfully"))
  .catch((error) => console.log(error.message));

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
  relative: relativeReducer,
});

const store = createStore(rootReducer, applyMiddleware(Thunk));

export default function App() {
  const [isConnected, setIsConnected] = useState(true);
  const [user, setUser] = useState();
  const [loaded, setLoaded] = useState(false);

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
      } catch (error) {
        console.log(error.message);
      }
    })();

    const unsubscribe = NetInfo.addEventListener((state) => {
      console.log("Is connected?", state.isConnected);
      setIsConnected(() => state.isConnected);
      store.dispatch(setConnectedToInternet(isConnected));
    });
    const unsubscribeStore = store.subscribe(() => {
      if (store.getState().auth.loadedData) {
        setUser(store.getState().auth);
        setLoaded(store.getState().auth.loadedData);
        unsubscribeStore();
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!isConnected) {
      // Alert.alert("Network Error", "You are not connect with internet", [
      //   { text: "Okay" },
      // ]);
      console.log("======================");
      console.log("Not Connected");
      console.log("======================");
    }
    if (isConnected && loaded) {
      store.dispatch(doBackgroundSync(user));
    }
  }, [isConnected, loaded]);

  return (
    <Provider store={store}>
      <View style={styles.container}>
        <AppNavigator />
        <StatusBar
          translucent={true}
          barStyle="light-content"
          backgroundColor="rgba(0, 0, 0, 0.1)"
          // hidden
          animated
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
