import React from "react";
import { Button, Text, View } from "react-native";

const LoginScreen = (props) => {
  const { navigation, route } = props;

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Hey see, what i just received: {route.params.iMParam}</Text>
      <Button
        title="Goto Start"
        onPress={() => {
          navigation.navigate("Start", { giveItBack: "Send it to you" });
        }}
      />
    </View>
  );
};

export default LoginScreen;
