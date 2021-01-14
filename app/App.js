import React from "react";
import { StyleSheet, View, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigator from "./navigation/AuthNavigator";
import { createStore, applyMiddleware, combineReducers } from "redux";
import { Provider } from "react-redux";
import { authReducer } from "./store/reducers/auth";
import Thunk from "redux-thunk";

const rootReducer = combineReducers({
  auth: authReducer,
});

const store = createStore(rootReducer, applyMiddleware(Thunk));

export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <NavigationContainer>
          <AuthNavigator />
        </NavigationContainer>
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
