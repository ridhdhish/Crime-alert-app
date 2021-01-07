import React, { Fragment } from "react";
import { Image, View, StyleSheet, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { colors } from "../colors";
import TitleText from "../components/TitleText";
import NormalText from "../components/NormalText";
import WaveSvg from "../components/WaveSvg";
import CustomTouchable from "../components/CustomTouchable";
import CustomButton from "../components/CustomButton";

const StartScreen = (props) => {
  const { navigation, route } = props;

  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        <Image
          source={require("../assets/images/startImage.png")}
          fadeDuration={500}
          resizeMode="cover"
          style={styles.image}
        />
        <TitleText style={{ marginVertical: 4 }}>Crime Alert</TitleText>
        <NormalText style={{ fontSize: 14 }}>Welcome to Crime Alert</NormalText>
      </View>
      <CustomButton
        text="Start"
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
  image: {
    height: 150,
    width: 150,
    borderRadius: 75,
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
    padding: 8,
  },
  startBtnText: {
    color: colors.textSecondary,
    fontSize: 20,
    paddingRight: 4,
  },
});

export default StartScreen;
