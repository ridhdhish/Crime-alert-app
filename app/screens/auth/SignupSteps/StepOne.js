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
      />
      <Input
        value={props.values.lastname}
        handleChange={props.handleChange("lastname")}
        name="lastname"
      />
      <Input
        value={props.values.email}
        handleChange={props.handleChange("email")}
        name="email"
      />
      <View
        style={{
          justifyContent: "flex-end",
          flexDirection: "row",
          width: 300,
        }}
      >
        <Ionicons
          name="ios-arrow-forward-circle"
          color={colors.backgroundPrimary}
          size={54}
          onPress={props.nextStep}
        />
      </View>
      <Text style={{ textAlign: "center", color: colors.textAccent }}>Or</Text>
      <View>
        <Ionicons name="ios-logo-google" size={30} />
        <Ionicons name="ios-logo-facebook" size={30} />
      </View>
    </Fragment>
  );
};

export default StepOne;
