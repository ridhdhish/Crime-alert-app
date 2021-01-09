import React from "react";
import { SvgXml } from "react-native-svg";

const WaveSvg = (props) => {
  let xml = props.svg;

  return <SvgXml xml={xml} />;
};

export default WaveSvg;
