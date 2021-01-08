import React, { Fragment, useEffect, useState } from "react";
import { Animated } from "react-native";

const FadeAnimation = (props) => {
  const [visible, setVisible] = useState(props.visible);
  const [visibility] = useState(new Animated.Value(visible ? 1 : 0));

  useEffect(() => {
    if (props.visible) {
      setVisible(true);
    }
    Animated.timing(visibility, {
      toValue: visible ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setVisible(props.visible);
    });
  }, [props.visible]);

  const { children } = props;

  if (visibility) {
    const containerStyle = {
      opacity: visibility.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
      }),
      transform: [
        {
          scale: visibility.interpolate({
            inputRange: [0, 1],
            outputRange: [1.1, 1],
          }),
        },
      ],
    };

    return <Animated.View style={containerStyle}>{children}</Animated.View>;
  }
  return <Fragment></Fragment>;
};

export default FadeAnimation;
