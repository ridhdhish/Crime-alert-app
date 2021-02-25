import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useDispatch } from "react-redux";
import { colors } from "../colors";
import CustomHeaderButton from "../components/CustomHeaderButton";
import PoliceScreen from "../screens/PoliceHomeScreen";
import { logout } from "../store/actions/police";

const PoliceStack = createStackNavigator();

const PoliceNavigator = () => {
  const dispatch = useDispatch();

  return (
    <PoliceStack.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: {
          backgroundColor: colors.backgroundPrimary,
        },
        headerTintColor: colors.textSecondary,
        headerRight: () => (
          <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item
              iconName={
                Platform.OS === "ios"
                  ? "ios-log-out-outline"
                  : "md-log-out-outline"
              }
              color={colors.textSecondary}
              onPress={() => {
                dispatch(logout());
              }}
            />
          </HeaderButtons>
        ),
      })}
    >
      <PoliceStack.Screen
        name="Police"
        component={PoliceScreen}
        options={{ title: "Police" }}
      />
    </PoliceStack.Navigator>
  );
};

export default PoliceNavigator;
