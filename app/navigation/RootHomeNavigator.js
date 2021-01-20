import React from "react";
import {
  createDrawerNavigator,
  DrawerItemList,
} from "@react-navigation/drawer";
import HomeNavigator from "./HomeNavigator";
import AddRelativeScreenStack from "./SubStackNavigators/AddRelativeScreenStack";
import HistoryScreenStack from "./SubStackNavigators/HistoryScreenStack";
import SettingScreenStack from "./SubStackNavigators/SettingScreenStack";
import { colors } from "../colors";
import { Button, SafeAreaView, Text, View } from "react-native";
import { logout } from "../store/actions/auth";
import { useDispatch, useSelector } from "react-redux";

const RootDrawer = createDrawerNavigator();

const RootHomeNavigator = () => {
  const user = useSelector((state) => state.auth?.user);
  const dispatch = useDispatch();

  return (
    <RootDrawer.Navigator
      drawerContentOptions={{
        activeBackgroundColor: colors.backgroundSecondary,
        activeTintColor: colors.textSecondary,
      }}
      drawerContent={(props) => (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
            <View style={{ margin: 20 }}>
              <Text>User: {user ? user.firstname : ""}</Text>
            </View>
            <DrawerItemList {...props} />
            <View
              style={{
                margin: 20,
              }}
            >
              <Button
                title="Logout"
                color={colors.backgroundTertiary}
                onPress={() => {
                  dispatch(logout());
                }}
              />
            </View>
          </SafeAreaView>
        </View>
      )}
    >
      <RootDrawer.Screen
        name="Home"
        component={HomeNavigator}
        options={{ title: "Home" }}
      />
      <RootDrawer.Screen
        name="AddRelative"
        component={AddRelativeScreenStack}
        options={{ title: "Add Relative" }}
      />
      <RootDrawer.Screen
        name="History"
        component={HistoryScreenStack}
        options={{ title: "History" }}
      />
      <RootDrawer.Screen
        name="Setting"
        component={SettingScreenStack}
        options={{ title: "Setting" }}
      />
    </RootDrawer.Navigator>
  );
};

export default RootHomeNavigator;
