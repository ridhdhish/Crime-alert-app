import React, { Fragment } from "react";
import { Image, StyleSheet } from "react-native";
import TitleText from "./TitleText";

const LogoText = (props) => {
  return (
    <Fragment>
      <Image
        source={require("../assets/images/startImage.png")}
        fadeDuration={500}
        resizeMode="cover"
        style={{ ...styles.image, ...props.style }}
      />
      <TitleText style={{ ...{ marginVertical: 16 }, ...props.textStyle }}>
        {props.title}
      </TitleText>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 150,
    width: 150,
    borderRadius: 75,
  },
});

export default LogoText;
