import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { TouchableOpacity } from "react-native";

const FloatingButton = (props) => {
  return (
    <TouchableOpacity
      style={{
        ...props.style,
        ...{
          position: "absolute",
          borderRadius: 100,
          bottom: 50,
          zIndex: 1000,
        },
      }}
      activeOpacity={0.8}
      onPress={props.onPress}
    >
      <Ionicons
        size={props.size}
        name={props.name}
        color={colors.textSecondary}
      />
    </TouchableOpacity>
  );
};

export default FloatingButton;
