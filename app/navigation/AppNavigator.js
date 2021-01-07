import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import StartScreen from "../screens/StartScreen";
import LoginScreen from "../screens/auth/LoginScreen";
import SignupScreen from "../screens/auth/SignupScreen";

const AppNavigator = () => {
  const Stack = createStackNavigator();

  const defaultNavigationOptions = {
    headerStyle: { backgroundColor: "black" },
    headerTintColor: "white",
  };

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Start"
        component={StartScreen}
        options={{
          title: "Crime Alert",
          ...defaultNavigationOptions,
        }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ title: "Login", ...defaultNavigationOptions }}
      />
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={{ title: "Register", ...defaultNavigationOptions }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
