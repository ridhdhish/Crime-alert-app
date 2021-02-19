import { Ionicons } from "@expo/vector-icons";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import React from "react";
import { Platform } from "react-native";
import { colors } from "../colors";
import PlacesScreen from "../screens/PlacesScreen";
import HomeScreenStack from "./SubStackNavigators/HomeScreenStack";
import ProfileScreenStack from "./SubStackNavigators/ProfileScreenStack";
import RelativeScreenStack from "./SubStackNavigators/RelativeScreenStack";

const HomeNavigator = () => {
  const HomeTabs = createMaterialBottomTabNavigator();

  return (
    <HomeTabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = "location";
          } else if (route.name === "Places") {
            iconName = "map";
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
      shifting
      initialRouteName="Profile"
    >
      <HomeTabs.Screen
        name="Home"
        component={HomeScreenStack}
        options={{ title: "Map" }}
      />
      <HomeTabs.Screen
        name="Places"
        component={PlacesScreen}
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
