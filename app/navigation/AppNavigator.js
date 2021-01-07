import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import StartScreen from "../screens/StartScreen";
import LoginScreen from "../screens/auth/LoginScreen";
import SignupScreen from "../screens/auth/SignupScreen";
import { Ionicons } from "@expo/vector-icons";

const AppNavigator = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "black" },
        headerTintColor: "white",
      }}
    >
      <Stack.Screen
        name="Start"
        component={StartScreen}
        options={{
          title: "Crime Alert",
        }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          title: "Login",
        }}
      />
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={{ title: "Register" }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
