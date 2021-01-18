import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
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
      options={{ title: "Home" }}
    />
  </HomeStack.Navigator>
);

export default HomeScreenStack;
