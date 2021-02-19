import { Ionicons } from "@expo/vector-icons";
import React, { Fragment, useState } from "react";
import { ActivityIndicator, Button, View } from "react-native";
import { colors } from "../../../colors";
import Input from "../../../components/Input";
import { getCrimeData } from "../../../utils/getCrimeData";

const StepOne = (props) => {
  const [loading, setLoading] = useState(false);

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
        textStyle={{
          marginTop: 20,
        }}
      />
      <View>
        <Input
          value={props.values.address}
          handleChange={props.handleChange("address")}
          name="address"
          setValid={props.setValid}
          textStyle={{
            marginTop: 20,
          }}
          style={{
            marginBottom: 5,
          }}
        />
        {loading ? (
          <ActivityIndicator size="large" color={colors.backgroundPrimary} />
        ) : (
          <Button
            title="Get Current Location"
            onPress={async () => {
              setLoading(true);
              const crimeData = await getCrimeData();
              setLoading(false);
              props.setFieldValue("address", crimeData.address);
            }}
            color={colors.backgroundPrimary}
          />
        )}
      </View>
      <View
        style={{
          justifyContent: "space-around",
          flexDirection: "row",
          width: 350,
          marginVertical: 10,
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
