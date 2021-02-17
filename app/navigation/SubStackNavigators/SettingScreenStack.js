import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import SettingScreen from "../../screens/SettingScreen";
import { stackCommonOption } from "../NavigationOptions";

const SettingStack = createStackNavigator();

const SettingScreenStack = () => (
  <SettingStack.Navigator
    screenOptions={({ navigation }) => ({
      ...stackCommonOption(navigation),
      headerShown: false,
    })}
  >
    <SettingStack.Screen
      name="Setting"
      component={SettingScreen}
      options={{ title: "Setting" }}
    />
  </SettingStack.Navigator>
);

export default SettingScreenStack;
