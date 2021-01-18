import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { useSelector } from "react-redux";
import LoadingScreen from "../screens/LoadingScreen";
import AuthNavigator from "./AuthNavigator";
import RootHomeNavigator from "./RootHomeNavigator";

const AppNavigator = (props) => {
  const isAuth = useSelector((state) => !!state.auth.token);
  const tryAutoLogin = useSelector((state) => state.auth.tryAutoLogin);

  return (
    <NavigationContainer>
      {!isAuth && !tryAutoLogin && <LoadingScreen />}
      {!isAuth && tryAutoLogin && <AuthNavigator />}
      {isAuth && <RootHomeNavigator />}
    </NavigationContainer>
  );
};
export default AppNavigator;
