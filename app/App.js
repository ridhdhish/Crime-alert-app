import React, { useEffect } from "react";
import { StyleSheet, View, StatusBar, LogBox } from "react-native";
import AppNavigator from "./navigation/AppNavigator";
import { createStore, applyMiddleware, combineReducers } from "redux";
import { Provider } from "react-redux";
import { authReducer } from "./store/reducers/auth";
import Thunk from "redux-thunk";

const rootReducer = combineReducers({
  auth: authReducer,
});

const store = createStore(rootReducer, applyMiddleware(Thunk));

export default function App() {
  useEffect(() => {
    LogBox.ignoreLogs(["Setting a timer"]);
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
