import React, { Fragment } from "react";
import { View, Text, StyleSheet } from "react-native";
import CustomTouchable from "./CustomTouchable";

const CustomButton = (props) => {
  return (
    <View style={{ ...styles.customBtn, ...props.style }}>
      <CustomTouchable
        onPress={props.onPress}
        style={{ ...props.touchableStyle }}
      >
        <Fragment>
          <Text style={{ ...styles.btnText, ...props.textStyle }}>
            {props.text}
          </Text>
          {props.children}
        </Fragment>
      </CustomTouchable>
    </View>
  );
};

const styles = StyleSheet.create({
  customBtn: {
    // padding: 4,
  },
  btnText: {
    fontSize: 15,
  },
});

export default CustomButton;
