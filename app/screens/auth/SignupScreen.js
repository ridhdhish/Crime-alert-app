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
    confirmPassword: false,
  });
  Keyboard.addListener("keyboardDidHide", () => {
    console.log("hell");
  });
  const setValid = (field, value) =>
    setIsDataValid({ ...dataValid, [field]: value });
  return (
    <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={1}>
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
                confirmPassword: "",
              }}
              onSubmit={(values) => {
                console.log(values);
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
                        onPress={handleSubmit}
                        title="Register"
                        color={colors.backgroundPrimary}
                      />
                    </View>
                  </FadeAnimation>
                  <TouchableWithoutFeedback
                    onPress={() => props.navigation.navigate("Login")}
                  >
                    <Text style={{ textAlign: "center", fontSize: 18 }}>
                      Already have an account ?{" "}
                      <Text style={{ color: colors.textAccent }}>Login</Text>
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
    width: 200,
  },
});

export default SignupScreen;
