import React, { Fragment } from "react";
import {
  Image,
  View,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { colors } from "../colors";
import TitleText from "../components/TitleText";
import NormalText from "../components/NormalText";
import WaveSvg from "../components/WaveSvg";
import CustomTouchable from "../components/CustomTouchable";
import CustomButton from "../components/CustomButton";
import LogoText from "../components/LogoText";

const StartScreen = (props) => {
  const { navigation, route } = props;

  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        <LogoText title="Crime Alert" />
        <NormalText style={{ fontSize: 14 }}>Welcome to Crime Alert</NormalText>
      </View>
      <CustomButton
        text="Register"
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
      <WaveSvg />
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
