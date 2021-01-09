import { Ionicons } from "@expo/vector-icons";
import React, { Fragment } from "react";
import { View } from "react-native";
import { colors } from "../../../colors";
import Input from "../../../components/Input";
import DateTimePicker from "@react-native-community/datetimepicker";

const StepOne = (props) => {
  return (
    <Fragment>
      <DateTimePicker
        testID="DOB"
        value={props.values.DOB}
        mode="date"
        is24Hour={true}
        display="default"
        onChange={props.handleChange("DOB")}
      />
      <Input
        value={props.values.mobileNumber}
        handleChange={props.handleChange("mobileNumber")}
        name="mobileNumber"
        config={{ keyboardType: "number-pad" }}
      />
      <Input
        value={props.values.address}
        handleChange={props.handleChange("address")}
        name="address"
      />
      <View
        style={{
          justifyContent: "space-around",
          flexDirection: "row",
          width: 300,
        }}
      >
        <Ionicons
          name="ios-arrow-back-circle"
          color={colors.backgroundPrimary}
          size={54}
          onPress={props.previousStep}
        />
        <Ionicons
          name="ios-arrow-forward-circle"
          color={colors.backgroundPrimary}
          size={54}
          onPress={props.nextStep}
        />
      </View>
    </Fragment>
  );
};

export default StepOne;
