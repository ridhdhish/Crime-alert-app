import AsyncStorage from "@react-native-async-storage/async-storage";
import { Formik } from "formik";
import React, { Fragment, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useDispatch, useSelector } from "react-redux";
import { colors } from "../colors";
import CustomHeaderButton from "../components/CustomHeaderButton";
import CustomTouchable from "../components/CustomTouchable";
import Input from "../components/Input";
import { updateProfile } from "../store/actions/auth";
import { sectionStyle } from "../utils/sectionStyle";
import { toTitleCase } from "../utils/toTitleCase";

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

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () =>
        isEdit ? (
          <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item
              iconName={Platform.OS === "ios" ? "ios-save" : "md-save"}
              color={colors.textSecondary}
              onPress={() => {
                editProfileHandler();
              }}
            />
          </HeaderButtons>
        ) : (
          <Fragment></Fragment>
        ),
    });
  }, [isEdit]);

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
    <ScrollView>
      {userData && userData.firstname && (
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
          }}
          style={{ flex: 1 }}
        >
          <View
            style={{
              ...styles.section,
              justifyContent: "center",
              flexDirection: "row",
              padding: 20,
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
              {({ values, handleChange }) => {
                return isEdit ? (
                  <Fragment>
                    <KeyboardAvoidingView
                      behavior="padding"
                      keyboardVerticalOffset={10}
                    >
                      <View style={styles.section}>
                        <Text style={styles.sectionTitle}>User Details</Text>
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
                    <View
                      style={{
                        ...styles.section,
                        marginTop: 10,
                      }}
                    >
                      <Text style={styles.sectionTitle}>User Details</Text>
                      {fields.map((field) => (
                        <View style={styles.detailsContainer} key={field}>
                          <Text style={styles.text}>{userData[field]}</Text>
                          <Text style={styles.titleText}>
                            {toTitleCase(field)}
                          </Text>
                        </View>
                      ))}
                    </View>
                  </Fragment>
                );
              }}
            </Formik>
          )}
        </TouchableWithoutFeedback>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  ...sectionStyle,
  profilePic: {
    width: 115,
    height: 115,
    backgroundColor: colors.backgroundExtra,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  profilePicText: {
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
    backgroundColor: colors.backgroundTertiary,
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    borderRadius: 5,
    color: colors.textSecondary,
  },
  profileSeparator: {
    width: "92%",
    borderBottomColor: colors.backgroundPrimary,
    borderBottomWidth: 1,
    marginTop: 35,
    marginLeft: "4%",
    alignItems: "center",
  },
  detailsContainer: {
    marginVertical: 10,
    borderBottomColor: "rgba(0, 0, 0, 0.05)",
    borderBottomWidth: 1,
  },
  titleText: {
    fontSize: 12,
    marginVertical: 5,
    color: "rgba(0, 0, 0, 0.3)",
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
