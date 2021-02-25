import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { Fragment, useEffect, useState } from "react";
import { Platform, StyleSheet, View } from "react-native";
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
import FloatingButton from "../components/FloatingButton";
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
        <Fragment>
          <AlertButton
            loading={loading}
            style={{ bottom: 50, marginBottom: 20 }}
            reportCrimeData={sendAlert}
            color={colors.backgroundPrimary}
          />
          <FloatingButton
            style={{
              top: 25,
              right: 25,
            }}
            onPress={() => props.navigation.navigate("Login")}
          >
            <Ionicons
              size={30}
              color={colors.textSecondary}
              name={Platform.OS === "android" ? "md-log-in" : "ios-log-in"}
            />
          </FloatingButton>
        </Fragment>
      ) : (
        <CustomButton
          text={"Register"}
          style={styles.startBtn}
          touchableStyle={{
            padding: 8,
            flexDirection: "row",
            alignItems: "center",
          }}
          textStyle={styles.startBtnText}
          onPress={() => {
            navigation.navigate("Signup");
          }}
        >
          <Ionicons
            name="ios-arrow-forward"
            size={20}
            color={colors.textSecondary}
          />
        </CustomButton>
      )}
      <FloatingButton
        style={{
          top: 25,
          left: 25,
        }}
        onPress={() => props.navigation.navigate("PoliceAuth")}
      >
        <MaterialIcons
          size={30}
          color={colors.textSecondary}
          name="local-police"
        />
      </FloatingButton>
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
