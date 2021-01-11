import React, { Fragment, useState } from "react";
import {
  Button,
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import LogoText from "../../components/LogoText";
import { Formik } from "formik";
import StepOne from "./SignupSteps/StepOne";
import StepTwo from "./SignupSteps/StepTwo";
import StepThree from "./SignupSteps/StepThree";
import FadeAnimation from "../../components/animations/FadeAnimation";
import { colors } from "../../colors";

const SignupScreen = (props) => {
  const [step, setStep] = useState(1);
  return (
    <ScrollView>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
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
            {({
              values,
              handleChange,
              handleSubmit,
              setFieldValue,
              resetForm,
            }) => (
              <Fragment>
                <FadeAnimation
                  style={step !== 1 ? { display: "none" } : {}}
                  show={step === 1}
                >
                  <StepOne
                    values={values}
                    handleChange={handleChange}
                    nextStep={() => setStep(() => 2)}
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
                  />
                  <View style={styles.registerBtn}>
                    <Button
                      onPress={handleSubmit}
                      title="Register"
                      color={colors.backgroundPrimary}
                    />
                  </View>
                </FadeAnimation>
                <Text
                  style={{
                    textAlign: "center",
                    color: colors.textAccent,
                    marginTop: 16,
                  }}
                >
                  Or
                </Text>
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
