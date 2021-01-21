import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { TouchableOpacity } from "react-native";
import { colors } from "../colors";

const FloatingButton = (props) => {
  return (
    <TouchableOpacity
      style={{
        ...{
          position: "absolute",
          borderRadius: 100,
          zIndex: 1000,
        },
        ...props.style,
      }}
      activeOpacity={0.8}
      onPress={props.onPress}
    >
      {props.children}
    </TouchableOpacity>
  );
};

export default FloatingButton;
