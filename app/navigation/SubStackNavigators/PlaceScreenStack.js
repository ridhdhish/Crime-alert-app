import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import PlacesScreen from "../../screens/PlacesScreen";
import { stackCommonOption } from "../NavigationOptions";

const PlaceStack = createStackNavigator();

const PlaceScreenStack = () => (
  <PlaceStack.Navigator
    screenOptions={({ navigation }) => ({
      ...stackCommonOption(navigation),
      headerShown: false,
    })}
  >
    <PlaceStack.Screen
      name="Place"
      component={PlacesScreen}
      options={{ title: "Place" }}
    />
  </PlaceStack.Navigator>
);

export default PlaceScreenStack;
