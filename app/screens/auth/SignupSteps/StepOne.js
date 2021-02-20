import { Ionicons } from "@expo/vector-icons";
import React, { Fragment } from "react";
import { Text, View } from "react-native";
import { colors } from "../../../colors";
import Input from "../../../components/Input";

const StepOne = (props) => {
  return (
    <Fragment>
      <Input
        value={props.values.firstname}
        handleChange={props.handleChange("firstname")}
        name="firstname"
        setValid={props.setValid}
        textStyle={{
          marginTop: 20,
        }}
      />
      <Input
        value={props.values.lastname}
        handleChange={props.handleChange("lastname")}
        name="lastname"
        setValid={props.setValid}
        textStyle={{
          marginTop: 20,
        }}
      />
      <Input
        value={props.values.email}
        handleChange={props.handleChange("email")}
        name="email"
        setValid={props.setValid}
        checkExistOnServer
        textStyle={{
          marginTop: 20,
        }}
      />
      <View
        style={{
          justifyContent: "flex-end",
          flexDirection: "row",
          width: 350,
        }}
      >
        <Ionicons
          name="ios-arrow-forward-circle"
          color={
            props.isAllFieldValid
              ? colors.backgroundPrimary
              : "rgba(0, 0, 0, 0.2)"
          }
          size={54}
          onPress={props.isAllFieldValid ? props.nextStep : () => {}}
        />
      </View>
    </Fragment>
  );
};

export default StepOne;
