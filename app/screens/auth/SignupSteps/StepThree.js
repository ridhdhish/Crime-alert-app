import { Ionicons } from "@expo/vector-icons";
import React, { Fragment, useState } from "react";
import { Text, View } from "react-native";
import { colors } from "../../../colors";
import Input from "../../../components/Input";
import CheckBox from "@react-native-community/checkbox";
import PasswordInput from "../../../components/PasswordInput";

const StepOne = (props) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Fragment>
      <View
        style={{
          justifyContent: "flex-start",
          flexDirection: "row",
          width: 350,
        }}
      >
        <Ionicons
          name="ios-arrow-back-circle"
          color={colors.backgroundPrimary}
          size={54}
          onPress={props.previousStep}
        />
      </View>

      <PasswordInput
        type="signup"
        value={props.values.password}
        handleChange={props.handleChange("password")}
        setValid={props.setValid}
      />
    </Fragment>
  );
};

export default StepOne;
