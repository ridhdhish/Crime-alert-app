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
import FadeAnimation from "../../components/animations/FadeAnimation";

const SignupScreen = (props) => {
  const [show, setShow] = useState(true);
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
            }}
            onSubmit={(values) => {
              console.log(values);
            }}
          >
            {({ values, handleChange, handleSubmit }) => (
              <Fragment>
                <FadeAnimation show={step === 1}>
                  <StepOne
                    values={values}
                    handleChange={handleChange}
                    nextStep={() => setStep(() => 2)}
                  />
                </FadeAnimation>
                <FadeAnimation show={step === 2}>
                  <StepTwo
                    values={values}
                    handleChange={handleChange}
                    nextStep={() => setStep(3)}
                    previousStep={() => setStep(1)}
                  />
                </FadeAnimation>
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
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SignupScreen;
