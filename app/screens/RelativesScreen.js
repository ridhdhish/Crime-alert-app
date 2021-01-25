import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import CustomTouchable from "../components/CustomTouchable";
import { colors } from "../colors";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";

const iconColors = ["orange", "green", "lightblue"];

const RelativesScreen = () => {
  return (
    <View style={styles.container}>
      <View style={{ marginTop: 20, borderRadius: 20 }}>
        <CustomTouchable rippleRadius={20} style={styles.btnWrap}>
          <Text style={styles.btnAdd}>Add friend</Text>
        </CustomTouchable>
      </View>

      <View style={{ marginTop: 20, borderRadius: 20 }}>
        <View style={styles.card}>
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
          <View style={styles.cardInfo}>
            <Text style={styles.cardName}>Ridhdhish Desai</Text>
            <Text
              style={{
                fontSize: 12,
                color: "#b0b0b0",
                fontWeight: "bold",
                marginBottom: 3,
              }}
            >
              9876567768
            </Text>
            <Text
              style={{
                fontSize: 11,
                color: "#b0b0b0",
                fontWeight: "bold",
                marginBottom: 3,
              }}
            >
              ridhdhishdesai@gmail.com
            </Text>
          </View>
          <View style={{ marginLeft: 40 }}>
            <MaterialIcons
              style={{ paddingBottom: 10 }}
              name="edit"
              size={24}
              color="black"
            />
            <MaterialIcons name="delete" size={24} color="red" />
          </View>
        </View>
        <View style={styles.card}>
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
          <View style={styles.cardInfo}>
            <Text style={styles.cardName}>Ridhdhish Desai</Text>
            <Text
              style={{
                fontSize: 12,
                color: "#b0b0b0",
                fontWeight: "bold",
                marginBottom: 3,
              }}
            >
              9876567768
            </Text>
            <Text
              style={{
                fontSize: 11,
                color: "#b0b0b0",
                fontWeight: "bold",
                marginBottom: 3,
              }}
            >
              ridhdhishdesai@gmail.com
            </Text>
          </View>
          <View style={{ marginLeft: 40 }}>
            <MaterialIcons
              style={{ paddingBottom: 10 }}
              name="edit"
              size={24}
              color="black"
            />
            <MaterialIcons name="delete" size={24} color="red" />
          </View>
        </View>
      </View>

      {/* <View style={styles.friendWrap}>
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
      </View> */}
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
  // friendWrap: {
  //   width: "95%",
  //   marginTop: 30,
  //   marginLeft: 0,
  //   borderRadius: 5,
  // },

  friendIcon: {
    width: 60,
    height: 60,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  // friendText: {
  //   marginLeft: 15,
  //   marginTop: 8,
  //   textAlign: "center",
  //   fontSize: 22,
  // },
  card: {
    width: 300,
    height: 100,
    marginTop: 20,
    paddingHorizontal: 10,
    alignItems: "center",
    borderRadius: 20,
    flexDirection: "row",
    backgroundColor: "white",
    elevation: 5,
  },
  cardInfo: {
    marginLeft: 15,
  },
  cardName: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#666767",
    marginBottom: 3,
  },
});

export default RelativesScreen;
