import React, { Fragment, useState } from "react";
import {
  Button,
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import LogoText from "../../components/LogoText";
import { Formik } from "formik";
import StepOne from "./SignupSteps/StepOne";
import StepTwo from "./SignupSteps/StepTwo";
import StepThree from "./SignupSteps/StepThree";
import FadeAnimation from "../../components/animations/FadeAnimation";
import { colors } from "../../colors";
import { validations } from "../../utils/validations";

const SignupScreen = (props) => {
  const [step, setStep] = useState(1);
  const [dataValid, setIsDataValid] = useState({
    firstname: false,
    lastname: false,
    email: false,
    DOB: false,
    mobileNumber: false,
    address: false,
    password: false,
  });
  const [isFormValid, setFormValid] = useState(false);
  const setValid = (field, value) => {
    setIsDataValid((prevValue) => ({ ...prevValue, [field]: value }));
    let formValid = Object.values(dataValid).reduce((prev, cur) => prev && cur);

    setFormValid(() => formValid);
  };
  return (
    <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={10}>
      <ScrollView>
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
          }}
          style={{ flex: 1 }}
        >
          <View style={styles.screen}>
            <LogoText title="Register" style={{ marginBottom: 16 }} />
            <Formik
              initialValues={{
                firstname: "",
                lastname: "",
                email: "",
                DOB: "",
                mobileNumber: "",
                address: "",
                password: "",
              }}
              onSubmit={(values) => {
                let splitData;
                if (values.DOB.includes("/")) {
                  splitData = values.DOB.split("/");
                } else if (values.DOB.includes("-")) {
                  splitData = values.DOB.split("-");
                } else if (values.DOB.includes(".")) {
                  splitData = values.DOB.split(".");
                }
                const transformedDOB = new Date(
                  splitData[2],
                  splitData[1],
                  splitData[0]
                );
                console.log({ ...values, DOB: transformedDOB });
              }}
            >
              {({ values, handleChange, handleSubmit, setFieldValue }) => (
                <Fragment>
                  <FadeAnimation
                    style={step !== 1 ? { display: "none" } : {}}
                    show={step === 1}
                  >
                    <StepOne
                      values={values}
                      handleChange={handleChange}
                      nextStep={() => setStep(() => 2)}
                      isValid={validations.firstname.i}
                      setValid={(field, value) => setValid(field, value)}
                      isAllFieldValid={
                        dataValid.firstname &&
                        dataValid.lastname &&
                        dataValid.email
                      }
                    />
                  </FadeAnimation>
                  <FadeAnimation
                    style={step !== 2 ? { display: "none" } : {}}
                    show={step === 2}
                  >
                    <StepTwo
                      values={values}
                      handleChange={handleChange}
                      setFieldValue={setFieldValue}
                      nextStep={() => setStep(3)}
                      previousStep={() => setStep(1)}
                      setValid={(field, value) => setValid(field, value)}
                      isAllFieldValid={
                        dataValid.DOB &&
                        dataValid.mobileNumber &&
                        dataValid.address
                      }
                    />
                  </FadeAnimation>
                  <FadeAnimation
                    style={step !== 3 ? { display: "none" } : {}}
                    show={step === 3}
                  >
                    <StepThree
                      values={values}
                      handleChange={handleChange}
                      previousStep={() => setStep(2)}
                      setValid={(field, value) => setValid(field, value)}
                    />
                    <View style={styles.registerBtn}>
                      <Button
                        onPress={
                          isFormValid
                            ? handleSubmit
                            : () =>
                                Alert.alert(
                                  "Provide All Data",
                                  "Please fill all the data before submitting",
                                  [
                                    {
                                      text: "Cancel",
                                      style: "cancel",
                                    },
                                    {
                                      text: "OK",
                                    },
                                  ]
                                )
                        }
                        title="Register"
                        color={
                          isFormValid
                            ? colors.backgroundPrimary
                            : colors.textAccent
                        }
                      />
                    </View>
                  </FadeAnimation>
                  <TouchableWithoutFeedback
                    onPress={() => props.navigation.navigate("Login")}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        fontSize: 18,
                        marginTop: 16,
                      }}
                    >
                      Already have an account ?{" "}
                      <Text
                        style={{
                          color: colors.textAccent,
                          textDecorationLine: "underline",
                        }}
                      >
                        Login
                      </Text>
                    </Text>
                  </TouchableWithoutFeedback>
                </Fragment>
              )}
            </Formik>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    paddingTop: 16,
  },
  registerBtn: {
    marginTop: 32,
  },
});

export default SignupScreen;
