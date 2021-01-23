import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect } from "react";
import { ActivityIndicator } from "react-native";
import { colors } from "../colors";
import { useDispatch } from "react-redux";
import { authUser, tryAutoLogin } from "../store/actions/auth";
import LogoText from "../components/LogoText";
import { LinearGradient } from "expo-linear-gradient";

const LoadingScreen = () => {
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
    <LinearGradient
      colors={[colors.backgroundSecondary, colors.backgroundAccent]}
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <LogoText title="Crime Alert" />
      <ActivityIndicator size="large" color={colors.backgroundPrimary} />
    </LinearGradient>
  );
};

export default LoadingScreen;
