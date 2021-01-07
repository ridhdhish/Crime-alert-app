import React from "react";
import { Text, StyleSheet } from "react-native";
import { colors } from "../colors";

const TitleText = (props) => {
  return (
    <Text style={{ ...styles.normalText, ...props.style }}>
      {props.children}
    </Text>
  );
};

const styles = StyleSheet.create({
  normalText: {
    fontSize: 18,
    color: colors.textAccent,
  },
});

export default TitleText;
