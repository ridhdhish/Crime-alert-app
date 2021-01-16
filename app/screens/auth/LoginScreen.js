import React, { useState, useEffect } from "react";
import {
  Button,
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  KeyboardAvoidingView,
  ActivityIndicator,
  Alert,
} from "react-native";
import LogoText from "../../components/LogoText";
import { Formik } from "formik";
import { colors } from "../../colors";
import Input from "../../components/Input";
import PasswordInput from "../../components/PasswordInput";
import { useDispatch } from "react-redux";
import { login } from "../../store/actions/auth";

const LoginScreen = (props) => {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

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
    <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={10}>
      <ScrollView>
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
          }}
          style={{ flex: 1 }}
        >
          <View style={styles.screen}>
            <LogoText title="Login" style={{ marginBottom: 16 }} />
            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              onSubmit={async (values) => {
                setError(null);
                setIsLoading(true);
                try {
                  await dispatch(
                    login({ email: values.email, password: values.password })
                  );
                  // props.navigation.navigate("Home");
                } catch (error) {
                  setError(error.message);

                  setIsLoading(false);
                }
              }}
            >
              {({ values, handleChange, handleSubmit }) => (
                <View>
                  <Input
                    value={values.email}
                    handleChange={handleChange("email")}
                    name="email"
                    type="login"
                  />
                  <PasswordInput
                    type="login"
                    value={values.password}
                    handleChange={handleChange("password")}
                    setValid={() => {}}
                  />
                  <View style={{ marginTop: 30 }}>
                    {isLoading ? (
                      <ActivityIndicator
                        size="large"
                        color={colors.backgroundPrimary}
                      />
                    ) : (
                      <Button
                        title="Login"
                        color={colors.backgroundPrimary}
                        onPress={handleSubmit}
                      />
                    )}
                  </View>
                  <TouchableWithoutFeedback
                    onPress={() => props.navigation.navigate("Signup")}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        fontSize: 18,
                        marginTop: 16,
                      }}
                    >
                      Don't have an account ?{" "}
                      <Text
                        style={{
                          color: colors.textAccent,
                          textDecorationLine: "underline",
                        }}
                      >
                        Register
                      </Text>
                    </Text>
                  </TouchableWithoutFeedback>
                </View>
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
});

export default LoginScreen;
