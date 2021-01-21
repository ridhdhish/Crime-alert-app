import React from "react";
import { Platform } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { colors } from "../colors";
import CustomHeaderButton from "../components/CustomHeaderButton";

export const stackCommonOption = (navigation) => ({
  headerStyle: {
    backgroundColor: colors.backgroundPrimary,
  },
  headerTintColor: colors.textSecondary,
  headerLeft: () => (
    <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
      <Item
        iconName={Platform.OS === "ios" ? "ios-menu" : "md-menu"}
        color={colors.textSecondary}
        onPress={() => navigation.toggleDrawer()}
      />
    </HeaderButtons>
  ),
});
