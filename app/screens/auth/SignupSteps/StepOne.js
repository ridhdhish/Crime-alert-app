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
      />
      <Input
        value={props.values.lastname}
        handleChange={props.handleChange("lastname")}
        name="lastname"
        setValid={props.setValid}
      />
      <Input
        value={props.values.email}
        handleChange={props.handleChange("email")}
        name="email"
        setValid={props.setValid}
        checkExistOnServer
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
              ? colors.backgroundSecondary
              : colors.textAccent
          }
          size={54}
          onPress={props.isAllFieldValid ? props.nextStep : () => {}}
        />
      </View>
      <Text
        style={{ textAlign: "center", color: colors.textAccent, marginTop: 16 }}
      >
        Or
      </Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Ionicons
          style={{ marginHorizontal: 8 }}
          name="ios-logo-google"
          size={40}
          color={colors.danger}
        />
        <Ionicons
          style={{ marginHorizontal: 8 }}
          name="ios-logo-facebook"
          size={40}
          color={colors.facebookBlue}
        />
      </View>
    </Fragment>
  );
};

export default StepOne;
