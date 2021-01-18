import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { colors } from "../colors";
import { useDispatch } from "react-redux";
import { authUser, tryAutoLogin } from "../store/actions/auth";
import LogoText from "../components/LogoText";

const LoadingScreen = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem("userData");

      if (!userData) {
        console.log("Navigate to Start");
        dispatch(tryAutoLogin());
        return;
      }

      const transformedData = JSON.parse(userData);
      const { user, token, expirationTime } = transformedData;
      if (
        new Date(expirationTime).getTime() <= new Date().getTime() ||
        !token ||
        !user
      ) {
        dispatch(tryAutoLogin());
        return;
      }
      console.log("Navigate to Home");
      const expireIn =
        new Date(expirationTime).getTime() - new Date().getTime();
      dispatch(authUser({ user, token, expirationTime: expireIn }));
    };
    tryLogin();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <LogoText title="Crime Alert" />
      <ActivityIndicator size="large" color={colors.backgroundPrimary} />
    </View>
  );
};

export default LoadingScreen;
