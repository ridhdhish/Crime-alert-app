import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../colors";
import { Platform } from "react-native";
import HomeScreenStack from "./SubStackNavigators/HomeScreenStack";
import PlaceScreenStack from "./SubStackNavigators/PlaceScreenStack";
import RelativeScreenStack from "./SubStackNavigators/RelativeScreenStack";
import ProfileScreenStack from "./SubStackNavigators/ProfileScreenStack";

const HomeNavigator = () => {
  const HomeTabs = createMaterialBottomTabNavigator();

  return (
    <HomeTabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = "map";
          } else if (route.name === "Places") {
            iconName = "location";
          } else if (route.name === "Relatives") {
            iconName = "people";
          } else if (route.name === "Profile") {
            iconName = "person";
          }
          return (
            <Ionicons
              size={23}
              color={focused ? colors.textSecondary : "#dddddd"}
              name={`${Platform.OS === "ios" ? "ios-" : "md-"}${iconName}${
                focused ? "" : "-outline"
              }`}
            />
          );
        },
        tabBarColor: colors.backgroundPrimary,
      })}
      initialRouteName="Profile"
    >
      <HomeTabs.Screen
        name="Home"
        component={HomeScreenStack}
        options={{ title: "Map" }}
      />
      <HomeTabs.Screen
        name="Places"
        component={PlaceScreenStack}
        options={{ title: "Places" }}
      />
      <HomeTabs.Screen
        name="Relatives"
        component={RelativeScreenStack}
        options={{ title: "Relatives" }}
      />
      <HomeTabs.Screen
        name="Profile"
        component={ProfileScreenStack}
        options={{ title: "Profile" }}
      />
    </HomeTabs.Navigator>
  );
};

export default HomeNavigator;
