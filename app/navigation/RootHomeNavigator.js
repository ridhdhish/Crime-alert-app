import React from "react";
import {
  createDrawerNavigator,
  DrawerItemList,
} from "@react-navigation/drawer";
import HomeNavigator from "./HomeNavigator";
import SettingScreenStack from "./SubStackNavigators/SettingScreenStack";
import AlertScreenStack from "./SubStackNavigators/AlertScreenStack";
import PoliceScreenStack from "./SubStackNavigators/PoliceScreenStack";
import { colors } from "../colors";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { toTitleCase } from "../utils/toTitleCase";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { isAndroid } from "../utils/isAndroid";

const RootDrawer = createDrawerNavigator();

const RootHomeNavigator = () => {
  const user = useSelector((state) => state.auth?.user);

  return (
    <RootDrawer.Navigator
      drawerContentOptions={{
        activeBackgroundColor: colors.backgroundExtra,
        activeTintColor: colors.textSecondary,
        // inactiveTintColor: colors.textSecondary,
      }}
      screenOptions={({ route }) => ({
        drawerIcon: ({ color, size, focused }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = "home";
          } else if (route.name === "History") {
            return <MaterialIcons size={size} color={color} name="history" />;
          } else if (route.name === "Setting") {
            iconName = "settings";
          } else if (route.name === "Alerts") {
            iconName = "notifications";
          } else if (route.name === "Police") {
            return (
              <MaterialIcons size={size} color={color} name="local-police" />
            );
          }
          return (
            <Ionicons
              size={size}
              color={color}
              name={`${isAndroid() ? "md-" : "ios-"}${iconName}${
                focused ? "" : "-outline"
              }`}
            />
          );
        },
      })}
      drawerContent={(props) => (
        <ScrollView>
          <View
            style={{
              flex: 1,
              // backgroundColor: "rgba(63, 52, 38, 0.9)",
            }}
          >
            <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
              {user && user.firstname && (
                <View
                  style={{
                    padding: 20,
                    backgroundColor: colors.backgroundPrimary,
                    marginBottom: 10,
                  }}
                >
                  <View
                    style={{
                      width: 70,
                      height: 70,
                      borderRadius: 70,
                      backgroundColor: colors.backgroundExtra,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        color: colors.textSecondary,
                        fontWeight: "bold",
                      }}
                    >
                      {user.firstname[0].toUpperCase()}
                      {user.lastname[0].toUpperCase()}
                    </Text>
                  </View>

                  <Text
                    style={{
                      marginTop: 10,
                      color: colors.textSecondary,
                      fontSize: 18,
                    }}
                  >
                    {toTitleCase(user.firstname)} {toTitleCase(user.lastname)}
                  </Text>
                  <Text style={{ color: "rgba(255, 255, 255, 0.8)" }}>
                    +91 {user.mobileNumber}
                  </Text>
                </View>
              )}

              <DrawerItemList {...props} />
            </SafeAreaView>
          </View>
        </ScrollView>
      )}
    >
      <RootDrawer.Screen
        name={"Home"}
        component={HomeNavigator}
        options={{
          title: "Home",
        }}
      />
      <RootDrawer.Screen
        name={"Police"}
        component={PoliceScreenStack}
        options={{
          title: "Near By PoliceStation",
        }}
      />
      <RootDrawer.Screen
        name="Setting"
        component={SettingScreenStack}
        options={{ title: "Settings" }}
      />
      <RootDrawer.Screen
        name="Alerts"
        component={AlertScreenStack}
        options={{ title: "Alerts" }}
      />
    </RootDrawer.Navigator>
  );
};

export default RootHomeNavigator;
