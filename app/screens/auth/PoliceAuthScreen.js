import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
  Button,
  StyleSheet,
  Dimensions,
  Keyboard,
  Alert,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import LogoText from "../../components/LogoText";
import { BlurView } from "expo-blur";
import { Formik } from "formik";
import Input from "../../components/Input";
import PasswordInput from "../../components/PasswordInput";
import { colors } from "../../colors";
import { useDispatch } from "react-redux";
import { policeAuth } from "../../store/actions/police";

const PoliceAuth = (props) => {
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (error) {
      Alert.alert("Error", error, [{ text: "Okay" }]);
    }
  }, [error]);

  return (
    <ScrollView
      contentContainerStyle={{
        minHeight: Dimensions.get("window").height,
        flexGrow: 1,
      }}
    >
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <LinearGradient
          colors={[colors.backgroundSecondary, colors.backgroundAccent]}
          style={styles.screen}
        >
          <LogoText
            title={`Police Station ${isLogin ? "Login" : "Register"}`}
            textStyle={{ color: colors.textSecondary }}
            style={{ marginBottom: 16, display: "none" }}
          />
          <BlurView intensity={50} style={{ borderRadius: 16 }}>
            <LinearGradient
              colors={["rgba(253, 253, 254, 0.3)", "rgba(253, 253, 254, 0.1)"]}
              style={{ padding: 16, borderRadius: 16 }}
            >
              {isLogin ? (
                <Formik
                  initialValues={{
                    contactNumber: "",
                    password: "",
                    key: "",
                  }}
                  onSubmit={async (values) => {
                    setError(null);
                    setIsLoading(true);
                    try {
                      await dispatch(policeAuth(values, true));
                      // props.navigation.navigate("Police");
                    } catch (error) {
                      setError(error.message);
                      setIsLoading(false);
                    }
                  }}
                >
                  {({ values, handleChange, handleSubmit }) => (
                    <View>
                      <Input
                        value={values.key}
                        handleChange={handleChange("key")}
                        name="key"
                        type="login"
                        style={{
                          marginBottom: 18,
                        }}
                      />
                      <Input
                        value={values.contactNumber}
                        handleChange={handleChange("contactNumber")}
                        name="contactNumber"
                        type="login"
                        style={{
                          marginBottom: 18,
                        }}
                        config={{
                          placeholder: "Contact Number",
                          keyboardType: "number-pad",
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
                        onPress={() => setIsLogin(false)}
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
              ) : (
                <Formik
                  initialValues={{
                    contactNumber: "",
                    password: "",
                    name: "",
                    address: "",
                    key: "",
                  }}
                  onSubmit={async (values) => {
                    setError(null);
                    setIsLoading(true);
                    try {
                      await dispatch(policeAuth(values));
                      // props.navigation.navigate("Police");
                    } catch (error) {
                      setError(error.message);
                      setIsLoading(false);
                    }
                  }}
                >
                  {({ values, handleChange, handleSubmit }) => (
                    <View>
                      <Input
                        value={values.contactNumber}
                        handleChange={handleChange("contactNumber")}
                        name="contactNumber"
                        style={{
                          marginBottom: 18,
                        }}
                        config={{
                          placeholder: "Contact Number",
                          keyboardType: "number-pad",
                        }}
                        type="login"
                      />
                      <Input
                        value={values.name}
                        handleChange={handleChange("name")}
                        name="name"
                        style={{
                          marginBottom: 18,
                        }}
                        type="login"
                      />
                      <Input
                        value={values.address}
                        handleChange={handleChange("address")}
                        name="address"
                        style={{
                          marginBottom: 18,
                        }}
                        type="login"
                      />
                      <Input
                        value={values.key}
                        handleChange={handleChange("key")}
                        name="key"
                        style={{
                          marginBottom: 18,
                        }}
                        type="login"
                      />
                      <PasswordInput
                        value={values.password}
                        handleChange={handleChange("password")}
                        setValid={() => {}}
                        type="login"
                      />
                      <View style={{ marginTop: 30 }}>
                        {isLoading ? (
                          <ActivityIndicator
                            size="large"
                            color={colors.backgroundPrimary}
                          />
                        ) : (
                          <Button
                            title="Register"
                            color={colors.backgroundPrimary}
                            onPress={handleSubmit}
                          />
                        )}
                      </View>
                      <TouchableWithoutFeedback
                        onPress={() => setIsLogin(true)}
                      >
                        <Text
                          style={{
                            textAlign: "center",
                            fontSize: 18,
                            marginTop: 16,
                          }}
                        >
                          Already Registered ?{" "}
                          <Text
                            style={{
                              color: colors.textSecondary,
                              textDecorationLine: "underline",
                            }}
                          >
                            Login
                          </Text>
                        </Text>
                      </TouchableWithoutFeedback>
                    </View>
                  )}
                </Formik>
              )}
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
    justifyContent: "center",
    paddingTop: 16,
    height: Dimensions.get("window").height,
  },
});

export default PoliceAuth;
