import CheckBox from "@react-native-community/checkbox";
import React, { Fragment, useState } from "react";
import { View, Text } from "react-native";
import { colors } from "../colors";
import Input from "./Input";

const PasswordInput = (props) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Fragment>
      <Input
        type={props.type}
        value={props.value}
        handleChange={props.handleChange}
        name="password"
        config={{
          secureTextEntry: !showPassword,
        }}
        setValid={props.setValid}
      />
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <CheckBox
          value={showPassword}
          onValueChange={(value) => setShowPassword(value)}
          tintColors={{
            true: colors.backgroundPrimary,
            false: colors.backgroundPrimary,
          }}
        />
        <Text>Show Password</Text>
      </View>
    </Fragment>
  );
};

export default PasswordInput;
