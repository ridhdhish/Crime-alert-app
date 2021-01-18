import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { stackCommonOption } from "../NavigationOptions";
import AddRelativeScreen from "../../screens/AddRelativeScree";

const AddRelativeStack = createStackNavigator();

const AddRelativeScreenStack = () => (
  <AddRelativeStack.Navigator
    screenOptions={({ navigation }) => ({
      ...stackCommonOption(navigation),
    })}
  >
    <AddRelativeStack.Screen
      name="AddRelative"
      component={AddRelativeScreen}
      options={{ title: "AddRelative" }}
    />
  </AddRelativeStack.Navigator>
);

export default AddRelativeScreenStack;
