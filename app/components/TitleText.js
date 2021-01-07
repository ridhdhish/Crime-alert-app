import React from "react";
import { Text, StyleSheet } from "react-native";
import { colors } from "../colors";

const TitleText = (props) => {
  return (
    <Text style={{ ...styles.titleText, ...props.style }}>
      {props.children}
    </Text>
  );
};

const styles = StyleSheet.create({
  titleText: {
    fontSize: 25,
    fontWeight: "bold",
    color: colors.textPrimary,
  },
});

export default TitleText;
