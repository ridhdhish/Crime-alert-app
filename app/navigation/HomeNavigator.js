import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";

const HomeNavigator = () => {
  const HomeStack = createStackNavigator();

  return (
    <HomeStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "black" },
        headerTintColor: "white",
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
