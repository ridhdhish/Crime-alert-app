import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import CustomTouchable from "../components/CustomTouchable";
import { colors } from "../colors";
import { FontAwesome } from "@expo/vector-icons";

const iconColors = ["orange", "green", "lightblue"];

const RelativesScreen = () => {
  return (
    <View style={styles.container}>
      <View style={{ marginTop: 20, borderRadius: 20 }}>
        <CustomTouchable rippleRadius={20} style={styles.btnWrap}>
          <Text style={styles.btnAdd}>Add friend</Text>
        </CustomTouchable>
      </View>
      <View style={styles.friendWrap}>
        <CustomTouchable style={{ flexDirection: "row", padding: 10 }}>
          <View
            style={{
              ...styles.friendIcon,
              ...{
                backgroundColor:
                  iconColors[Math.floor(Math.random() * iconColors.length)],
              },
            }}
          >
            <FontAwesome name="user" size={27} color="white" />
          </View>
          <Text style={styles.friendText}>Ridhdhish Desai</Text>
        </CustomTouchable>
        <CustomTouchable style={{ flexDirection: "row", padding: 10 }}>
          <View
            style={{
              ...styles.friendIcon,
              ...{
                backgroundColor:
                  iconColors[Math.floor(Math.random() * iconColors.length)],
              },
            }}
          >
            <FontAwesome name="user" size={27} color="white" />
          </View>
          <Text style={styles.friendText}>Manan Desai</Text>
        </CustomTouchable>
        <CustomTouchable style={{ flexDirection: "row", padding: 10 }}>
          <View
            style={{
              ...styles.friendIcon,
              ...{
                backgroundColor:
                  iconColors[Math.floor(Math.random() * iconColors.length)],
              },
            }}
          >
            <FontAwesome name="user" size={27} color="white" />
          </View>
          <Text style={styles.friendText}>Naruto Uzumaki</Text>
        </CustomTouchable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  btnWrap: {
    paddingVertical: 7,
    paddingHorizontal: 60,
    backgroundColor: colors.backgroundAccent,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 5,
  },
  btnAdd: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.backgroundPrimary,
  },
  friendWrap: {
    width: "95%",
    marginTop: 30,
    marginLeft: 0,
    borderRadius: 5,
  },

  friendIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  friendText: {
    marginLeft: 15,
    marginTop: 8,
    textAlign: "center",
    fontSize: 22,
  },
  friendSaperator: {
    borderWidth: 0.5,
    width: "96%",
    marginLeft: "2%",
    borderColor: colors.backgroundExtra,
  },
});

export default RelativesScreen;
