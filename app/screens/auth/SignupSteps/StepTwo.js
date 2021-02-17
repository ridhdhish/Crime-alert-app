import { Ionicons } from "@expo/vector-icons";
import React, { Fragment } from "react";
import { View } from "react-native";
import { colors } from "../../../colors";
import Input from "../../../components/Input";

const StepOne = (props) => {
  return (
    <Fragment>
      <Input
        value={props.values.mobileNumber}
        handleChange={props.handleChange("mobileNumber")}
        name="mobileNumber"
        setValid={props.setValid}
        config={{
          placeholder: "(+91) Mobile Number",
          keyboardType: "number-pad",
        }}
        checkExistOnServer
      />
      <Input
        value={props.values.address}
        handleChange={props.handleChange("address")}
        name="address"
        setValid={props.setValid}
      />
      <View
        style={{
          justifyContent: "space-around",
          flexDirection: "row",
          width: 350,
        }}
      >
        <Ionicons
          name="ios-arrow-back-circle"
          color={colors.backgroundSecondary}
          size={54}
          onPress={props.previousStep}
        />
        <Ionicons
          name="ios-arrow-forward-circle"
          color={
            props.isAllFieldValid
              ? colors.backgroundSecondary
              : colors.textAccent
          }
          size={54}
          onPress={props.isAllFieldValid ? props.nextStep : () => {}}
        />
      </View>
    </Fragment>
  );
};

export default StepOne;
