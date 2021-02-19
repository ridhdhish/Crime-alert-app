import React, { useState, useEffect } from "react";
import {
  Button,
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  ActivityIndicator,
  Alert,
  Dimensions,
} from "react-native";
import LogoText from "../../components/LogoText";
import { Formik } from "formik";
import { colors } from "../../colors";
import Input from "../../components/Input";
import PasswordInput from "../../components/PasswordInput";
import { useDispatch } from "react-redux";
import { login } from "../../store/actions/auth";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";

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
          <LogoText
            title="Login"
            textStyle={{ color: colors.textSecondary }}
            style={{ marginBottom: 16 }}
          />
          <BlurView intensity={50} style={{ borderRadius: 16 }}>
            <LinearGradient
              colors={["rgba(253, 253, 254, 0.3)", "rgba(253, 253, 254, 0.1)"]}
              style={{ padding: 16, borderRadius: 16 }}
            >
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
                      style={{
                        marginBottom: 18,
                      }}
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
                            color: colors.textSecondary,
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
            </LinearGradient>
          </BlurView>
        </LinearGradient>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    paddingTop: 16,
    height: Dimensions.get("window").height,
  },
});

export default LoginScreen;
