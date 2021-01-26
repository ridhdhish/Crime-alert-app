import React, { useEffect, useState } from "react";
import { View, Modal, Animated, Dimensions, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const BottomPopup = (props) => {
  useEffect(() => {
    if (props.modalVisible) {
      comeUp.start();
    }
  }, [props.modalVisible]);

  const panY = useState(new Animated.Value(Dimensions.get("window").height))[0];

  const comeUp = Animated.timing(panY, {
    toValue: 0,
    duration: 500,
    useNativeDriver: true,
  });
  const goDown = Animated.timing(panY, {
    toValue: Dimensions.get("window").height,
    duration: 500,
    useNativeDriver: true,
  });

  return (
    <Modal
      animated
      animationType="fade"
      visible={props.modalVisible}
      transparent
      onRequestClose={props.closeModal}
    >
      <View
        style={{
          backgroundColor: "rgba(0,0,0,0.2)",
          flex: 1,
          justifyContent: "flex-end",
        }}
      >
        <Animated.View
          style={[
            {
              backgroundColor: "white",
              padding: 12,
              borderTopRightRadius: 12,
              borderTopLeftRadius: 12,
              transform: [
                {
                  translateY: panY,
                },
              ],
            },
          ]}
        >
          <Ionicons
            name={Platform.OS === "android" ? "md-close" : "ios-close"}
            size={24}
            style={{
              marginLeft: "auto",
            }}
            onPress={() => {
              goDown.start(() => {
                props.closeModal();
              });
            }}
          />
          {props.children}
        </Animated.View>
      </View>
    </Modal>
  );
};

export default BottomPopup;
