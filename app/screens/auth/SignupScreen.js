import React, { Fragment, useState } from "react";
import {
  Button,
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import LogoText from "../../components/LogoText";
import { Formik } from "formik";
import StepOne from "./SignupSteps/StepOne";
import FadeAnimation from "../../components/animations/FadeAnimation";

const SignupScreen = (props) => {
  const [show, setShow] = useState(true);

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
              <Button title="toggle show" onPress={() => setShow(!show)} />
              <FadeAnimation visible={show}>
                <StepOne values={values} handleChange={handleChange} />
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
