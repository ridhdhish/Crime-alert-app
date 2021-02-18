import React, { useEffect, useState } from "react";
import { Modal, Animated, Dimensions, Platform, Pressable } from "react-native";
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
    duration: 300,
    useNativeDriver: true,
  });
  const goDown = Animated.timing(panY, {
    toValue: Dimensions.get("window").height,
    duration: 300,
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
      <Pressable
        style={{
          backgroundColor: "rgba(0,0,0,0.2)",
          flex: 1,
          justifyContent: "flex-end",
        }}
        onPress={() => {
          goDown.start(() => props.closeModal());
        }}
      >
        <Pressable
          onPress={() => {
            console.log("Pressed outside backdrop");
            // goDown.start(() => props.closeModal());
          }}
        >
          <Animated.View
            style={[
              {
                backgroundColor: "white",
                padding: 12,
                zIndex: 10,
                borderTopRightRadius: 20,
                borderTopLeftRadius: 20,
                position: "relative",
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
              size={30}
              style={{
                position: "absolute",
                top: 12,
                right: 12,
                zIndex: 100,
              }}
              onPress={() => {
                goDown.start(() => {
                  props.closeModal();
                });
              }}
            />
            {props.children}
          </Animated.View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default BottomPopup;
