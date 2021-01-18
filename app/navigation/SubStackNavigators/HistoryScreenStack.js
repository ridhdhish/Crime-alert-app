import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import HistoryScreen from "../../screens/HistoryScreen";
import { stackCommonOption } from "../NavigationOptions";

const HistoryStack = createStackNavigator();

const HistoryScreenStack = () => (
  <HistoryStack.Navigator
    screenOptions={({ navigation }) => ({
      ...stackCommonOption(navigation),
    })}
  >
    <HistoryStack.Screen
      name="History"
      component={HistoryScreen}
      options={{ title: "History" }}
    />
  </HistoryStack.Navigator>
);

export default HistoryScreenStack;
