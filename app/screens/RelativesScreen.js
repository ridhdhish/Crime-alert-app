import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TouchableNativeFeedback,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import CustomTouchable from "../components/CustomTouchable";
import { colors } from "../colors";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import {
  TextInput,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { Formik } from "formik";
import { useDispatch } from "react-redux";
import { addRelative } from "../store/actions/relative";

const iconColors = ["orange", "green", "lightblue"];

import Input from "../components/Input";

const RelativesScreen = () => {
  // Fetch relatives here

  const dispatch = useDispatch();

  const [isAdd, setIsAdd] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

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

  return (
    <View style={styles.container}>
      <View style={{ marginTop: 20, borderRadius: 20 }}>
        <CustomTouchable
          onPress={() => {
            setModalVisible(true);
          }}
          rippleRadius={20}
          style={styles.btnWrap}
        >
          <Text style={styles.btnAdd}>Add friend</Text>
        </CustomTouchable>
      </View>

      <View style={{ marginTop: 20, borderRadius: 20, zIndex: -2 }}>
        <View style={styles.card}>
          <View
            style={{
              ...styles.cardIcon,
              ...{
                backgroundColor:
                  iconColors[Math.floor(Math.random() * iconColors.length)],
              },
            }}
          >
            <FontAwesome name="user" size={27} color="white" />
          </View>
          <View style={styles.cardInfo}>
            <Text style={styles.cardName}>Ridhdhish Desai</Text>
            <Text
              style={{
                fontSize: 12,
                color: "#b0b0b0",
                fontWeight: "bold",
                marginBottom: 3,
              }}
            >
              9876567768
            </Text>
            <Text
              style={{
                fontSize: 11,
                color: "#b0b0b0",
                fontWeight: "bold",
                marginBottom: 3,
              }}
            >
              ridhdhishdesai@gmail.com
            </Text>
          </View>
          <View style={{ marginLeft: 40 }}>
            <CustomTouchable>
              <MaterialIcons
                style={{ marginBottom: 10 }}
                name="edit"
                size={24}
                color="black"
              />
            </CustomTouchable>
            <CustomTouchable>
              <MaterialIcons name="delete" size={24} color="red" />
            </CustomTouchable>
          </View>
        </View>
      </View>

      {isLoading ? (
        <View style={{ marginVertical: "40%" }}>
          <ActivityIndicator size="large" color={colors.backgroundPrimary} />
        </View>
      ) : modalVisible ? (
        <TouchableOpacity
          onPress={() => {
            Keyboard.dismiss();
            console.log("hello");
          }}
          style={styles.modal}
        >
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <View style={{ padding: 10, flexDirection: "row" }}>
                  <Text style={{ fontSize: 24, fontWeight: "bold" }}>
                    New Friend
                  </Text>
                  <TouchableOpacity
                    style={{
                      position: "absolute",
                      left: "65%",
                      marginTop: 4,
                    }}
                    onPress={() => {
                      setModalVisible(false);
                    }}
                  >
                    <AntDesign name="closecircleo" size={24} color="black" />
                  </TouchableOpacity>
                </View>

                <Formik
                  initialValues={{
                    firstname: "",
                    lastname: "",
                    mobileNumber: "",
                    email: "",
                  }}
                  onSubmit={async (values) => {
                    console.log(values);
                    setError(null);
                    setIsLoading(true);
                    try {
                      await dispatch(addRelative(values));
                    } catch (error) {
                      setError(error.message);
                    } finally {
                      setIsLoading(false);
                    }
                  }}
                >
                  {({ values, handleChange, handleSubmit, setFieldValue }) => {
                    return (
                      <View>
                        <Input
                          name="firstname"
                          value={values.firstname}
                          setValid={setValid}
                          config={{ placeholder: "Firstname" }}
                          style={styles.modalFormInput}
                          handleChange={handleChange("firstname")}
                          styleError={styles.error}
                        />
                        <Input
                          name="lastname"
                          value={values.lastname}
                          setValid={setValid}
                          config={{ placeholder: "Lastname" }}
                          style={styles.modalFormInput}
                          handleChange={handleChange("lastname")}
                          disableError={"false"}
                        />
                        <Input
                          name="mobileNumber"
                          value={values.mobileNumber}
                          setValid={setValid}
                          config={{
                            placeholder: "Mobile Number",
                            keyboardType: "number-pad",
                          }}
                          style={styles.modalFormInput}
                          handleChange={handleChange("mobileNumber")}
                          styleError={styles.error}
                        />
                        <Input
                          name="email"
                          value={values.email}
                          setValid={setValid}
                          config={{ placeholder: "Email" }}
                          style={styles.modalFormInput}
                          handleChange={handleChange("email")}
                          disableError={"false"}
                        />

                        <TouchableOpacity
                          activeOpacity={isFormValid ? 0.5 : 1}
                          style={{
                            ...styles.openButton,
                            backgroundColor: isFormValid
                              ? "#2196F3"
                              : "#7fc4fa",
                          }}
                          onPress={
                            isFormValid
                              ? () => {
                                  console.log("form valid");
                                  setModalVisible(() => false);
                                  handleSubmit();
                                }
                              : () => {}
                          }
                        >
                          <Text style={styles.textStyle}>Add Friend</Text>
                        </TouchableOpacity>
                      </View>
                    );
                  }}
                </Formik>
              </View>
            </View>
          </Modal>
        </TouchableOpacity>
      ) : (
        []
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
  },
  btnWrap: {
    paddingVertical: 7,
    paddingHorizontal: 60,
    backgroundColor: colors.backgroundAccent,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 5,
  },
  btnAdd: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.backgroundPrimary,
  },

  cardIcon: {
    width: 60,
    height: 60,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },

  card: {
    width: 400,
    maxWidth: "90%",
    height: 100,
    marginTop: 20,
    paddingHorizontal: 10,
    alignItems: "center",
    borderRadius: 20,
    flexDirection: "row",
    backgroundColor: "white",
    elevation: 5,
    zIndex: -1,
  },
  cardInfo: {
    marginLeft: 15,
    flex: 1,
  },
  cardName: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#666767",
    marginBottom: 3,
  },
  modal: {
    position: "absolute",
    backgroundColor: "black",
    opacity: 0.5,
    width: "100%",
    height: "100%",
    zIndex: 20,
  },
  modalView: {
    margin: 20,
    marginTop: "30%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
    elevation: 2,
    marginBottom: 10,
    marginTop: 10,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  centeredView: {
    zIndex: 3,
  },
  modalFormInput: {
    borderWidth: 1,
    width: 300,
    borderRadius: 10,
    padding: 8,
    fontSize: 20,
    marginBottom: 20,
  },
  error: {
    marginTop: -15,
    fontSize: 15,
    color: "red",
  },
});

export default RelativesScreen;
