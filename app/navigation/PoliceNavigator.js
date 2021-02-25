import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import PoliceScreen from "../screens/PoliceHomeScreen";
import { stackCommonOption } from "./NavigationOptions";

const PoliceStack = createStackNavigator();

const PoliceNavigator = () => (
  <PoliceStack.Navigator
    screenOptions={({ navigation }) => ({
      ...stackCommonOption(navigation),
    })}
  >
    <PoliceStack.Screen
      name="Police"
      component={PoliceScreen}
      options={{ title: "Police" }}
    />
  </PoliceStack.Navigator>
);

export default PoliceNavigator;
