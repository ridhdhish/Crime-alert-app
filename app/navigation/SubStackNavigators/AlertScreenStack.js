import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import AlertScreen from "../../screens/AlertScreen";
import { stackCommonOption } from "../NavigationOptions";

const AlertStack = createStackNavigator();

const AlertScreenStack = () => (
  <AlertStack.Navigator
    screenOptions={({ navigation }) => ({
      ...stackCommonOption(navigation),
    })}
  >
    <AlertStack.Screen
      name="Alert"
      component={AlertScreen}
      options={{ title: "Alert" }}
    />
  </AlertStack.Navigator>
);

export default AlertScreenStack;
