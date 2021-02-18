import React, { Fragment, useEffect, useState } from "react";
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
  ActivityIndicator,
  Dimensions,
} from "react-native";
import LogoText from "../../components/LogoText";
import { Formik } from "formik";
import StepOne from "./SignupSteps/StepOne";
import StepTwo from "./SignupSteps/StepTwo";
import StepThree from "./SignupSteps/StepThree";
import FadeAnimation from "../../components/animations/FadeAnimation";
import { colors } from "../../colors";
import { validations } from "../../utils/validations";
import { useDispatch } from "react-redux";
import { signup } from "../../store/actions/auth";
import { LinearGradient } from "expo-linear-gradient";

const SignupScreen = (props) => {
  const [step, setStep] = useState(1);
  const [dataValid, setIsDataValid] = useState({
    firstname: false,
    lastname: false,
    email: false,
    mobileNumber: false,
    address: false,
    password: false,
  });

  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [isFormValid, setFormValid] = useState(false);
  const setValid = (field, value) => {
    setIsDataValid((prevValue) => ({ ...prevValue, [field]: value }));
    let formValid = Object.values(dataValid).reduce((prev, cur) => prev && cur);

    setFormValid(() => formValid);
  };

  useEffect(() => {
    if (error) {
      Alert.alert("Error", error, [
        {
          text: "OK",
        },
      ]);
    }
  }, [error]);

  return (
    <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={0}>
      <ScrollView>
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
          }}
          style={{ flex: 1 }}
        >
          <LinearGradient
            colors={[colors.backgroundSecondary, colors.backgroundAccent]}
            style={styles.screen}
          >
            <LogoText title="Register" style={{ marginBottom: 16 }} />
            <Formik
              initialValues={{
                firstname: "",
                lastname: "",
                email: "",
                mobileNumber: "",
                address: "",
                password: "",
              }}
              onSubmit={async (values) => {
                setError(null);
                setIsLoading(true);
                try {
                  await dispatch(signup(values));
                  // props.navigation.navigate("Home");
                } catch (error) {
                  setError(error.message);
                  setIsLoading(false);
                }
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
                        dataValid.mobileNumber && dataValid.address
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
                      {isLoading ? (
                        <ActivityIndicator
                          size="large"
                          color={colors.backgroundPrimary}
                        />
                      ) : (
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
                      )}
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
          </LinearGradient>
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
    height: Dimensions.get("window").height,
  },
  registerBtn: {
    marginTop: 32,
  },
});

export default SignupScreen;
