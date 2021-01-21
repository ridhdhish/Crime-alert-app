import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import ProfileScreen from "../../screens/ProfileScreen";
import { stackCommonOption } from "../NavigationOptions";

const ProfileStack = createStackNavigator();

const ProfileScreenStack = () => (
  <ProfileStack.Navigator
    screenOptions={({ navigation }) => ({
      ...stackCommonOption(navigation),
      // headerShown: false,
    })}
  >
    <ProfileStack.Screen
      name="Profile"
      component={ProfileScreen}
      options={{ title: "Profile" }}
    />
  </ProfileStack.Navigator>
);

export default ProfileScreenStack;
