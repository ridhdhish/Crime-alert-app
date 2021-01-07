import React from "react";
import { Button, Text, View } from "react-native";

const StartScreen = (props) => {
  const { navigation, route } = props;

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
      {route.params?.giveItBack && (
        <Text>Login send me this: {route.params.giveItBack}</Text>
      )}
      <Button
        title="Goto Login"
        onPress={() => {
          navigation.navigate("Login", { iMParam: "I am param" });
        }}
      />
      <Button
        title="Goto Signup"
        onPress={() => {
          navigation.navigate("Signup");
        }}
      />
    </View>
  );
};

export default StartScreen;
