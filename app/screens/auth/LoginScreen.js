import React from "react";
import { Button, Text, View } from "react-native";

const LoginScreen = (props) => {
  const { navigation, route } = props;

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Login</Text>
    </View>
  );
};

export default LoginScreen;
