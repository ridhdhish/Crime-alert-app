import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { useSelector } from "react-redux";
import LoadingScreen from "../screens/LoadingScreen";
import AuthNavigator from "./AuthNavigator";
import RootHomeNavigator from "./RootHomeNavigator";
import PoliceNavigator from "../navigation/PoliceNavigator";

const AppNavigator = (props) => {
  const isAuth = useSelector((state) => {
    return !!state.auth.token || !!state.police.token;
  });
  const tryAutoLogin = useSelector((state) => state.auth.tryAutoLogin);
  const isPolice = useSelector((state) => state.auth.isPolice);
  console.log(isAuth);
  return (
    <NavigationContainer>
      {!isAuth && !tryAutoLogin && <LoadingScreen />}
      {!isAuth && tryAutoLogin && <AuthNavigator />}
      {isAuth && (!isPolice ? <RootHomeNavigator /> : <PoliceNavigator />)}
    </NavigationContainer>
  );
};
export default AppNavigator;
