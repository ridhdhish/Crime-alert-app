import React, { Fragment, useEffect, useState } from "react";
import { StyleSheet, Text, TextInput } from "react-native";
import { colors } from "../colors";
import { validations } from "../utils/validations";

const Input = (props) => {
  const [focus, setFocus] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [editedData, setEditedData] = useState(props.value);

  useEffect(() => {
    if (props.type !== "login") {
      let isValid;
      if (props.name === "confirmPassword") {
        console.log(props.value, props.password);
        isValid = validations[props.name]?.isValid(props.value, props.password);
      } else {
        isValid = validations[props.name]?.isValid(props.value);
      }
      props.setValid(props.name, isValid);
      setIsValid(() => isValid);
    }
  }, [props.value, focus, props.name]);

  return (
    <Fragment>
      <TextInput
        value={props.value}
        onChangeText={props.handleChange}
        placeholder={props.name.charAt(0).toUpperCase() + props.name.slice(1)}
        style={{
          ...styles.input,
          ...{
            borderBottomColor: focus
              ? colors.backgroundAccent
              : colors.textPrimary,
          },
          ...props.style,
        }}
        spellCheck={false}
        onFocus={() => setFocus(true)}
        onBlur={() => {
          setFocus(false);
          setIsTouched(() => true);
        }}
        {...props.config}
      />
      {isTouched && !isValid && props.type !== "login" && (
        <Text style={props.styleError ? props.styleError : styles.errorText}>
          {" "}
          {validations[props.name].message}{" "}
        </Text>
      )}
    </Fragment>
  );
};

const styles = StyleSheet.create({
  input: {
    borderBottomWidth: 2,
    paddingVertical: 8,
    width: 300,
    maxWidth: "90%",
    fontSize: 18,
    marginTop: 16,
    borderRadius: 5,
  },
  errorText: {
    fontSize: 15,
    color: "red",
  },
});

export default Input;
