import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import { colors } from "../colors";

const HomeNavigator = () => {
  const HomeStack = createStackNavigator();

  return (
    <HomeStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.backgroundPrimary },
        headerTintColor: colors.textSecondary,
      }}
    >
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "Home" }}
      />
    </HomeStack.Navigator>
  );
};

export default HomeNavigator;
