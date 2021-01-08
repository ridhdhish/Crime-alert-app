import React, { useState } from "react";
import { StyleSheet, TextInput } from "react-native";
import { colors } from "../colors";

const Input = (props) => {
  const [focus, setFocus] = useState(false);

  return (
    <TextInput
      value={props.value}
      onChangeText={props.handleChange}
      placeholder={props.name}
      style={{
        ...styles.input,
        ...{
          borderColor: focus ? colors.backgroundAccent : colors.textAccent,
        },
        ...props.style,
      }}
      spellCheck={false}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 2,
    paddingHorizontal: 16,
    paddingVertical: 8,
    width: 300,
    maxWidth: "90%",
    fontSize: 18,
    marginVertical: 16,
    borderRadius: 5,
    elevation: 2,
  },
});

export default Input;
