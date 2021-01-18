import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import { colors } from "../colors";
import PlacesScreen from "../screens/PlacesScreen";
import RelativesScreen from "../screens/RelativesScreen";
import ProfileScreen from "../screens/ProfileScreen";

const HomeNavigator = () => {
  const HomeTabs = createMaterialBottomTabNavigator();
  const HomeStack = createStackNavigator();

  return (
    <HomeTabs.Navigator screenOptions={{}} shifting={false}>
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "Home" }}
      />
      <HomeStack.Screen
        name="Places"
        component={PlacesScreen}
        options={{ title: "Places" }}
      />
      <HomeStack.Screen
        name="Relatives"
        component={RelativesScreen}
        options={{ title: "Relatives" }}
      />
      <HomeStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: "Profile" }}
      />
    </HomeTabs.Navigator>
  );
};

export default HomeNavigator;
