import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { ActivityIndicator, Dimensions } from "react-native";
import { colors } from "../colors";
import FloatingButton from "./FloatingButton";

const AlertButton = (props) => {
  return (
    <FloatingButton
      style={{
        ...{
          width: 90,
          height: 90,
          bottom: 50,
          left: Dimensions.get("window").width / 2 - 40,
          padding: 30,
          backgroundColor: props.color || colors.backgroundSecondary,
        },
        ...props.style,
      }}
      onPress={props.loading ? () => {} : props.reportCrimeData}
    >
      {props.loading ? (
        <ActivityIndicator size="large" color={colors.textSecondary} />
      ) : (
        <AntDesign size={30} name="notification" color={colors.textSecondary} />
      )}
    </FloatingButton>
  );
};

export default AlertButton;
