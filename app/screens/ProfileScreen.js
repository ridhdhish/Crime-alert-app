import React, { Fragment, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
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

const ProfileScreen = (props) => {
  const fields = ["firstname", "lastname", "email", "mobileNumber"];

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
    console.log(isEdit);
    props.navigation.setOptions({
      headerRight: () =>
        isEdit ? (
          <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item
              iconName={Platform.OS === "ios" ? "ios-save" : "md-save"}
              color={colors.textSecondary}
              onPress={() => {}}
            />
          </HeaderButtons>
        ) : (
          <Fragment></Fragment>
        ),
    });
  }, [isEdit]);

  return (
    <View>
      <ScrollView>
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
              paddingTop: 35,
            }}
          >
            <View style={styles.profilePic}>
              <Text style={styles.profilePicText}>RD</Text>
            </View>
            <View style={{ paddingLeft: 35, paddingTop: 12 }}>
              <Text style={styles.profileName}>Ridhdhish Desai</Text>
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
          <View style={styles.profileSaperator}></View>

          <Formik
            initialValues={{
              firstname: "Ridhdhish",
              lastname: "Desai",
              email: "rid@gmail.com",
              mobileNumber: "9865741126",
            }}
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
                          handleChange={handleChange}
                        />
                      ))}
                    </View>
                  </KeyboardAvoidingView>
                </Fragment>
              ) : (
                <Fragment>
                  <View style={{ marginTop: 10 }}>
                    {fields.map((field) => (
                      <View style={styles.detailsContainer} key={field}>
                        <Text style={styles.titleText}>
                          {field.toUpperCase()}
                        </Text>
                        <Text style={styles.text}>{values[field]}</Text>
                      </View>
                    ))}
                  </View>
                </Fragment>
              );
            }}
          </Formik>
        </TouchableWithoutFeedback>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  profilePic: {
    width: 115,
    height: 115,
    backgroundColor: "#BF755A",
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
    backgroundColor: "#F2913D",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  profileSaperator: {
    width: "92%",
    borderBottomColor: "#403527",
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
    width: 250,
    paddingVertical: 10,
    paddingLeft: 15,
    margin: 10,
    marginHorizontal: "19%",
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
    color: "#403527",
  },
});

export default ProfileScreen;
