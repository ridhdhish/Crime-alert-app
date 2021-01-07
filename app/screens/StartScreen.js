import React from "react";
import { Button, Image, Text, View, StyleSheet } from "react-native";

const StartScreen = (props) => {
  const { navigation, route } = props;

  return (
    <View style={styles.screen}>
      <Image
        source={require("../assets/images/startImage.png")}
        fadeDuration={500}
        resizeMode="cover"
        style={styles.image}
      />
      <Text>Crime Alert</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    height: 150,
    width: 150,
    borderRadius: 75,
    marginVertical: 16,
  },
});

export default StartScreen;
