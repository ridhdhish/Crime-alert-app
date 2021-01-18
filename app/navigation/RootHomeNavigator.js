import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeNavigator from "./HomeNavigator";
import AddRelativeScreen from "../screens/AddRelativeScree";
import HistoryScreen from "../screens/HistoryScreen";
import SettingScreen from "../screens/SettingScreen";

const RootDrawer = createDrawerNavigator();

const RootHomeNavigator = () => {
  return (
    <RootDrawer.Navigator>
      <RootDrawer.Screen
        name="Home"
        component={HomeNavigator}
        options={{ title: "Home" }}
      />
      <RootDrawer.Screen
        name="AddRelative"
        component={AddRelativeScreen}
        options={{ title: "Add Relative" }}
      />
      <RootDrawer.Screen
        name="History"
        component={HistoryScreen}
        options={{ title: "History" }}
      />
      <RootDrawer.Screen
        name="Setting"
        component={SettingScreen}
        options={{ title: "Setting" }}
      />
    </RootDrawer.Navigator>
  );
};

export default RootHomeNavigator;
