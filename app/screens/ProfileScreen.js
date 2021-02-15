import React, { Fragment, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  ActivityIndicator,
} from "react-native";
import { Formik } from "formik";

import Input from "../components/Input";
import CustomTouchable from "../components/CustomTouchable";
import {
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../components/CustomHeaderButton";
import { colors } from "../colors";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../store/actions/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Layout from "../components/Layout";
import FloatingButton from "../components/FloatingButton";
import { Ionicons } from "@expo/vector-icons";

const ProfileScreen = (props) => {
  const dispatch = useDispatch();

  const ref = useRef();

  const userData = useSelector((state) => state.auth.user);
  const fields = ["firstname", "lastname", "email", "mobileNumber"];

  const [isLoading, setIsLoading] = useState(false);

  const [isEdit, setIsEdit] = useState(false);
  const [isDataValid, setIsDataValid] = useState({
    firstname: true,
    lastname: true,
    email: true,
    mobileNumber: true,
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const setValid = (field, value) => {
    setIsDataValid((prevValue) => ({ ...prevValue, [field]: value }));
    let formValid = Object.values(isDataValid).reduce(
      (prev, cur) => prev && cur
    );

    setIsFormValid(() => formValid);
  };

  const editProfileHandler = async (values) => {
    //console.log(ref.current.values);
    setIsLoading(true);
    const userData = ref.current.values;
    try {
      const user = await AsyncStorage.getItem("userData");
      const transformedData = JSON.parse(user);
      const expirationTime = transformedData.expirationTime;

      await dispatch(updateProfile(userData, expirationTime));

      setIsEdit(() => false);
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };

  return (
    <Layout>
      <ScrollView>
        {isEdit && (
          <FloatingButton
            style={{
              right: 15,
              top: 25,
            }}
            onPress={() => editProfileHandler()}
          >
            <Ionicons
              size={30}
              name={Platform.OS === "ios" ? "ios-save" : "md-save"}
              color={colors.textSecondary}
            />
          </FloatingButton>
        )}
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
          }}
          style={{ flex: 1 }}
        >
          <View
            style={{
              justifyContent: "center",
              flexDirection: "row",
              paddingTop: 80,
            }}
          >
            <View style={styles.profilePic}>
              <Text style={styles.profilePicText}>
                {userData.firstname[0]}
                {userData.lastname[0]}
              </Text>
            </View>
            <View style={{ paddingLeft: 35, paddingTop: 12 }}>
              <Text style={styles.profileName}>
                {userData.firstname} {userData.lastname}
              </Text>
              <CustomTouchable
                onPress={() => {
                  setIsEdit((prevEdit) => !prevEdit);
                }}
              >
                <Text style={styles.btnEdit}>
                  {" "}
                  {!isEdit ? "Edit Profile" : "Cancel"}
                </Text>
              </CustomTouchable>
            </View>
          </View>
          <View style={styles.profileSeparator}></View>

          {isLoading ? (
            <View style={{ marginVertical: "40%" }}>
              <ActivityIndicator
                size="large"
                color={colors.backgroundPrimary}
              />
            </View>
          ) : (
            <Formik
              innerRef={ref}
              initialValues={{
                firstname: userData.firstname,
                lastname: userData.lastname,
                email: userData.email,
                mobileNumber: userData.mobileNumber.toString(),
              }}
              onSubmit={async (values) => {}}
            >
              {({ values, handleChange, handleSubmit, setFieldValue }) => {
                return isEdit ? (
                  <Fragment>
                    <KeyboardAvoidingView
                      behavior="padding"
                      keyboardVerticalOffset={10}
                    >
                      <View>
                        {fields.map((field) => (
                          <Input
                            key={field}
                            style={styles.input}
                            name={field}
                            value={values[field]}
                            setValid={setValid}
                            handleChange={handleChange(field)}
                            styleError={styles.error}
                          />
                        ))}
                      </View>
                    </KeyboardAvoidingView>
                  </Fragment>
                ) : (
                  <Fragment>
                    <View style={{ marginTop: 10, alignItems: "center" }}>
                      {fields.map((field) => (
                        <View style={styles.detailsContainer} key={field}>
                          <Text style={styles.titleText}>
                            {field.toUpperCase()}
                          </Text>
                          <Text style={styles.text}>{userData[field]}</Text>
                        </View>
                      ))}
                    </View>
                  </Fragment>
                );
              }}
            </Formik>
          )}
        </TouchableWithoutFeedback>
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  profilePic: {
    width: 115,
    height: 115,
    backgroundColor: colors.backgroundExtra,
    borderRadius: 57.5,
    alignItems: "center",
  },
  profilePicText: {
    position: "absolute",
    top: "36%",
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
    letterSpacing: 2,
  },
  profileName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 18,
  },
  btnEdit: {
    paddingVertical: 10,
    paddingHorizontal: 25,
    backgroundColor: colors.backgroundTertiary,
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  profileSeparator: {
    width: "92%",
    borderBottomColor: colors.backgroundPrimary,
    borderBottomWidth: 1,
    marginTop: 35,
    marginLeft: "4%",
    alignItems: "center",
  },
  input: {
    margin: 20,
    marginHorizontal: "13%",
  },
  detailsContainer: {
    width: 300,
    maxWidth: "90%",
    paddingVertical: 10,
    paddingLeft: 15,
    margin: 10,
    backgroundColor: "#fad9bb",
    borderRadius: 10,
  },
  titleText: {
    fontSize: 13,
    fontWeight: "bold",
  },
  text: {
    marginTop: 4,
    fontSize: 18,
    color: colors.backgroundPrimary,
  },
  error: {
    marginTop: -15,
    marginLeft: 55,
    fontSize: 15,
    color: "red",
  },
});

export default ProfileScreen;
