import React, { useEffect } from "react";
import { Alert, StatusBar, StyleSheet, View } from "react-native";
import { Provider } from "react-redux";
import { applyMiddleware, combineReducers, createStore } from "redux";
import Thunk from "redux-thunk";
import AppNavigator from "./navigation/AppNavigator";
import { authReducer } from "./store/reducers/auth";
import { crimeReducer } from "./store/reducers/crime";
import * as Permissions from "expo-permissions";

const rootReducer = combineReducers({
  auth: authReducer,
  crime: crimeReducer,
});

const store = createStore(rootReducer, applyMiddleware(Thunk));

export default function App() {
  useEffect(() => {
    // LogBox.ignoreLogs(["Setting a timer"]);
    (async function askPermissions() {
      const result = await Permissions.askAsync(Permissions.LOCATION);
      console.log(result.status);
      if (result.status !== "granted") {
        Alert.alert(
          "Permission Required",
          "To report crime you need to provide the location Permission",
          [
            {
              text: "Okay",
            },
          ]
        );
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
