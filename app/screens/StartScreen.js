import React, { useLayoutEffect } from "react";
import { Button, Text, View } from "react-native";

const StartScreen = (props) => {
  const { navigation, route } = props;

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
      <Button
        title="Goto Login"
        onPress={() => {
          navigation.navigate("Login", { iMParam: "I am param" });
        }}
      />
    </View>
  );
};

export default StartScreen;
