import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { colors } from "../../colors";
import LogoText from "../../components/LogoText";
import { Formik } from "formik";

const SignupScreen = (props) => {
  return (
    <View style={styles.screen}>
      <LogoText title="Register" />
      <Formik
        initialValues={{
          firstname: "",
          lastname: "",
          password: "",
          email: "",
          DOB: "",
          mobileNumber: "",
          address: "",
        }}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ values, handleChange, handleSubmit }) => (
          <TextInput
            value={values.firstname}
            onChangeText={handleChange("firstname")}
            placeholder="Firstname"
            style={styles.input}
          />
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    paddingTop: 16,
  },
  input: {
    borderBottomColor: colors.textAccent,
    borderBottomWidth: 1,
    padding: 2,
    width: "70%",
  },
});

export default SignupScreen;
