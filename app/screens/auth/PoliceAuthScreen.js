import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
  Button,
  StyleSheet,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import LogoText from "../../components/LogoText";
import { BlurView } from "expo-blur";
import { Formik } from "formik";
import Input from "../../components/Input";
import PasswordInput from "../../components/PasswordInput";
import { colors } from "../../colors";
import { useDispatch } from "react-redux";

const PoliceAuth = () => {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

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
            title="Police"
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
                  contactNumber: "",
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
                      name="contactNumber"
                      type="login"
                      style={{
                        marginBottom: 18,
                      }}
                      config={{
                        placeholder: "Contact Number",
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
                        Didn't Registered Yet ?{" "}
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

export default PoliceAuth;
