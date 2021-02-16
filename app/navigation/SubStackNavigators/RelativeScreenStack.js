import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import RelativesScreen from "../../screens/RelativesScreen";
import { stackCommonOption } from "../NavigationOptions";

const RelativeStack = createStackNavigator();

const RelativeScreenStack = () => (
  <RelativeStack.Navigator
    screenOptions={({ navigation }) => ({
      ...stackCommonOption(navigation),
      // headerShown: false,
    })}
  >
    <RelativeStack.Screen
      name="Relative"
      component={RelativesScreen}
      options={{ title: "Relative" }}
    />
  </RelativeStack.Navigator>
);

export default RelativeScreenStack;
