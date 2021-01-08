import React, { Fragment, useState } from "react";
import {
  Button,
  Keyboard,
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
              <Button title="Show" onPress={() => setStep(2)} />
              <Button title="Hide" onPress={() => setStep(1)} />
              <FadeAnimation visible={step === 1}>
                <StepOne
                  values={values}
                  handleChange={handleChange}
                  nextStep={() => setStep(() => 1)}
                />
              </FadeAnimation>
              <FadeAnimation visible={step === 2}>
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
