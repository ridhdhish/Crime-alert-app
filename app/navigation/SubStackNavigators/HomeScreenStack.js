import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import HomeScreen from "../../screens/HomeScreen";
import { stackCommonOption } from "../NavigationOptions";

const HomeStack = createStackNavigator();

const HomeScreenStack = () => (
  <HomeStack.Navigator
    screenOptions={({ navigation }) => ({
      ...stackCommonOption(navigation),
      headerShown: false,
    })}
  >
    <HomeStack.Screen
      name="Home"
      component={HomeScreen}
      options={{ title: "Map" }}
    />
  </HomeStack.Navigator>
);

export default HomeScreenStack;
