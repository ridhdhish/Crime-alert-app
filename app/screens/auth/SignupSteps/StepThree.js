import { Ionicons } from "@expo/vector-icons";
import React, { Fragment } from "react";
import { View } from "react-native";
import { colors } from "../../../colors";
import Input from "../../../components/Input";

const StepOne = (props) => {
  return (
    <Fragment>
      <View
        style={{
          justifyContent: "flex-start",
          flexDirection: "row",
          width: 300,
        }}
      >
        <Ionicons
          name="ios-arrow-back-circle"
          color={colors.backgroundSecondary}
          size={54}
          onPress={props.previousStep}
        />
      </View>
      <Input
        value={props.values.password}
        handleChange={props.handleChange("password")}
        name="password"
      />
      <Input
        value={props.values.confirmPassword}
        handleChange={props.handleChange("confirmPassword")}
        name="confirmPassword"
      />
    </Fragment>
  );
};

export default StepOne;
