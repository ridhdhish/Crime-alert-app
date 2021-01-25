import React from "react";
import { Platform, TouchableOpacity } from "react-native";
import { TouchableNativeFeedback } from "react-native-gesture-handler";

const CustomTouchable = (props) => {
  let TouchableComponent = TouchableOpacity;

  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableComponent = TouchableNativeFeedback;
  }

  return (
    <TouchableComponent
      // background={TouchableNativeFeedback.SelectableBackground(
      //   props.rippleRadius
      // )}
      style={{ ...props.style }}
      onPress={props.onPress}
    >
      {props.children}
    </TouchableComponent>
  );
};

export default CustomTouchable;
