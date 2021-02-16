import { Ionicons } from "@expo/vector-icons";
import React, { Fragment } from "react";
import { Platform, Text } from "react-native";
import { colors } from "../colors";
import FloatingButton from "./FloatingButton";

const Layout = (props) => {
  return (
    <Fragment>
      <FloatingButton
        style={{
          left: 15,
          top: 25,
          zIndex: 1010101111,
        }}
        onPress={() => props.navigation.toggleDrawer()}
      >
        <Ionicons
          size={30}
          name={Platform.OS === "android" ? "md-menu" : "ios-menu"}
          color={colors.textSecondary}
        />
      </FloatingButton>
      {props.children}
    </Fragment>
  );
};

export default Layout;
