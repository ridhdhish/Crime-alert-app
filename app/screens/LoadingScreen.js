import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect } from "react";
import { ActivityIndicator } from "react-native";
import { colors } from "../colors";
import { useDispatch } from "react-redux";
import {
  authUser,
  me,
  setLoadedData,
  tryAutoLogin,
} from "../store/actions/auth";
import LogoText from "../components/LogoText";
import { LinearGradient } from "expo-linear-gradient";
import { refreshPoliceData, setIsPolice } from "../store/actions/police";

const LoadingScreen = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem("userData");
      const isPolice = await JSON.parse(await AsyncStorage.getItem("police"));

      if (isPolice) {
        dispatch(setIsPolice());
      }
      if (!userData) {
        console.log("Navigate to Start");
        dispatch(tryAutoLogin());
        dispatch(setLoadedData(true));
        return;
      }

      const transformedData = JSON.parse(userData);
      const { user, token, expirationTime } = transformedData;
      if (
        !isPolice &&
        (new Date(expirationTime).getTime() <= new Date().getTime() ||
          !token ||
          !user)
      ) {
        await dispatch(tryAutoLogin());
        return;
      }
      console.log("Navigate to Home");
      const expireIn =
        new Date(expirationTime).getTime() - new Date().getTime();
      await dispatch(
        authUser({
          user,
          token: isPolice ? null : token,
          expirationTime: expireIn,
        })
      );
      if (!isPolice) {
        await dispatch(me());
      } else {
        await dispatch(refreshPoliceData());
      }
      await dispatch(setLoadedData(true));
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
