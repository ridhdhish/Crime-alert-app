import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import AlertScreen from "../../screens/AlertScreen";
import HomeScreen from "../../screens/HomeScreen";
import { stackCommonOption } from "../NavigationOptions";

const HomeStack = createStackNavigator();

const HomeScreenStack = () => (
  <HomeStack.Navigator
    screenOptions={({ navigation }) => ({
      ...stackCommonOption(navigation),
    })}
  >
    <HomeStack.Screen
      name="Home"
      component={HomeScreen}
      options={{ title: "Map", headerShown: false }}
    />
    <HomeStack.Screen
      name="Alerts"
      component={AlertScreen}
      options={{ title: "Alerts" }}
    />
  </HomeStack.Navigator>
);

export default HomeScreenStack;
