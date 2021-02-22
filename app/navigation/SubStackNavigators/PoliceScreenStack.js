import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import PoliceScreen from "../../screens/PoliceScreen";
import { stackCommonOption } from "../NavigationOptions";

const PoliceStack = createStackNavigator();

const PoliceScreenStack = () => (
  <PoliceStack.Navigator
    screenOptions={({ navigation }) => ({
      ...stackCommonOption(navigation),
      // headerShown: false,
    })}
  >
    <PoliceStack.Screen
      name="Police"
      component={PoliceScreen}
      options={{ title: "Police Stations" }}
    />
  </PoliceStack.Navigator>
);

export default PoliceScreenStack;
