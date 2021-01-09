import { Ionicons } from "@expo/vector-icons";
import React, { Fragment } from "react";
import { Text, View } from "react-native";
import { colors } from "../../../colors";
import Input from "../../../components/Input";

const StepOne = (props) => {
  return (
    <Ionicons
      name="ios-arrow-back-circle"
      color={colors.backgroundPrimary}
      size={54}
      onPress={props.previousStep}
    />
  );
};

export default StepOne;
