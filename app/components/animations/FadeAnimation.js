import React, { Fragment, useEffect, useState } from "react";
import { Animated } from "react-native";

const FadeAnimation = (props) => {
  const { show } = props;
  const [visible, setVisible] = useState(show);
  const [visibility] = useState(new Animated.Value(visible ? 1 : 0.5));
  useEffect(() => {
    if (show) {
      setVisible(true);
    }
    Animated.timing(visibility, {
      toValue: visible ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setVisible(!show);
    });
  }, [show]);

  const { children, style } = props;

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

    return (
      <Animated.View style={{ ...containerStyle, ...style }}>
        {children}
      </Animated.View>
    );
  }
  return <Fragment></Fragment>;
};

export default FadeAnimation;
