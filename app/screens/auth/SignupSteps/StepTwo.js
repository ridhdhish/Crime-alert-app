import { Ionicons } from "@expo/vector-icons";
import React, { Fragment, useState } from "react";
import { View } from "react-native";
import { colors } from "../../../colors";
import Input from "../../../components/Input";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";

const StepOne = (props) => {
  // const [showDateDialogue, setShowDateDialogue] = useState(false);
  // const [date, setDate] = useState("");

  return (
    <Fragment>
      {/* {showDateDialogue && (
        <DateTimePicker
          testID="DOB"
          value={date || new Date()}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={(_, date) => {
            setDate(date);
            setShowDateDialogue(false);
            props.setFieldValue("DOB", date);
          }}
        />
      )} */}
      {/* <Ionicons
          name="ios-calendar"
          color={colors.textPrimary}
          size={30}
          onPress={() => setShowDateDialogue(true)}
          style={{ position: "absolute", right: 0 }}
        /> */}

      <Input
        value={props.values.DOB}
        setValid={props.setValid}
        handleChange={props.handleChange("DOB")}
        name="DOB"
        config={{
          placeholder: "Date Of Birth (DD-MM-YYYY)",
        }}
      />
      <Input
        value={props.values.mobileNumber}
        handleChange={props.handleChange("mobileNumber")}
        name="mobileNumber"
        config={{ keyboardType: "number-pad" }}
        setValid={props.setValid}
        config={{
          placeholder: "(+91) Mobile Number",
        }}
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
          width: 300,
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
