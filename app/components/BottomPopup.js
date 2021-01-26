import React, { useRef, useState } from "react";
import {
  View,
  Text,
  Animated,
  TouchableOpacity,
  PanResponder,
} from "react-native";

const BottomPopup = () => {
  const value = useState(new Animated.Value(0))[0];
  const startAnimation = () => {
    Animated.timing(value, {
      toValue: 100,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        console.log("Hello");
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value,
        });
      },
      onPanResponderMove: (_, gesture) => {
        pan.setValue({
          x: gesture.dx,
          y: gesture.dy,
        });
      },
      onPanResponderRelease: () => {
        pan.flattenOffset();
      },
    })
  ).current;
  return (
    <View>
      <Animated.View
        style={[
          {
            height: 100,
            width: 100,
            borderRadius: 100,
            backgroundColor: "red",
            transform: [
              {
                translateX: pan.x,
              },
            ],
          },
          // pan.getLayout(),
        ]}
        {...panResponder.panHandlers}
      />

      <TouchableOpacity onPress={startAnimation}>
        <Text>Touch me</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BottomPopup;
