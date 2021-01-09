import React, { useState } from "react";
import { StyleSheet, TextInput } from "react-native";
import { colors } from "../colors";

const Input = (props) => {
  const [focus, setFocus] = useState(false);

  return (
    <TextInput
      value={props.value}
      onChangeText={props.handleChange}
      placeholder={props.name.charAt(0).toUpperCase() + props.name.slice(1)}
      style={{
        ...styles.input,
        ...{
          borderBottomColor: focus
            ? colors.backgroundAccent
            : colors.textAccent,
        },
        ...props.style,
      }}
      spellCheck={false}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
      {...props.config}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    borderBottomWidth: 2,
    paddingVertical: 8,
    width: 300,
    maxWidth: "90%",
    fontSize: 18,
    marginVertical: 16,
    borderRadius: 5,
  },
});

export default Input;
