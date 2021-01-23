import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { Fragment, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useDispatch } from "react-redux";
import { colors } from "../colors";
import CustomButton from "../components/CustomButton";
import AlertButton from "../components/AlertButton";
import LogoText from "../components/LogoText";
import NormalText from "../components/NormalText";
import SVG from "../components/SVG";
import { reportCrime } from "../store/actions/crime";
import { getCrimeData } from "../utils/getCrimeData";
import { sendNotification } from "../utils/sendNotification";
import { WAVE_SVG } from "../utils/svg";
import { useNotification } from "../hooks/useNotification";
const StartScreen = (props) => {
  const { navigation } = props;
  const [onceRegistered, setOnceRegistered] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useNotification();

  useEffect(() => {
    AsyncStorage.getItem("secretToken").then((data) => {
      setOnceRegistered(!!data);
    });
  }, []);

  const sendAlert = async () => {
    setLoading(true);
    try {
      const crimeData = await getCrimeData();
      dispatch(reportCrime(crimeData));
      sendNotification({
        title: "Sent Notification",
        body: "Alert has be reported successfully",
      });
    } catch (error) {
      console.log(error.message);
      Alert.alert("Error", error.message, [{ text: "Okay" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        <LogoText title="Crime Alert" />
        <NormalText style={{ fontSize: 14 }}>Welcome to Crime Alert</NormalText>
      </View>
      {onceRegistered ? (
        <AlertButton
          loading={loading}
          style={{ bottom: 100 }}
          reportCrimeData={sendAlert}
          color={colors.backgroundPrimary}
        />
      ) : (
        <Fragment></Fragment>
      )}
      <CustomButton
        text={onceRegistered ? "Login" : "Register"}
        style={styles.startBtn}
        touchableStyle={{
          padding: 8,
          flexDirection: "row",
          alignItems: "center",
        }}
        textStyle={styles.startBtnText}
        onPress={() => {
          navigation.navigate(onceRegistered ? "Login" : "Register");
        }}
      >
        <Ionicons
          name="ios-arrow-forward"
          size={20}
          color={colors.textSecondary}
        />
      </CustomButton>
      <SVG svg={WAVE_SVG} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    backgroundColor: colors.textSecondary,
    paddingTop: 50,
    overflow: "hidden",
  },
  container: {
    flex: 1,
    alignItems: "center",
    marginBottom: 16,
  },
  startBtn: {
    position: "absolute",
    bottom: 50,
    zIndex: 5,
  },
  startBtnText: {
    color: colors.textSecondary,
    fontSize: 20,
    paddingRight: 4,
  },
});

export default StartScreen;
