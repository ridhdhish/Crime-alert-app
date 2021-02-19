import React, { Fragment, useState } from "react";
import { View, Text, Pressable } from "react-native";
import { colors } from "../colors";
import CustomButton from "./CustomButton";

const SetAppPassword = (props) => {
  const [mode, setMode] = useState("code");

  return (
    <Fragment>
      <Text
        style={{
          textAlign: "center",
          fontSize: 20,
          fontWeight: "bold",
          marginVertical: 10,
        }}
      >
        Set App Password
      </Text>
      <View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <Pressable
            onPress={() => {
              setMode("code");
            }}
          >
            <CustomButton
              text={"Pass-code"}
              style={{
                padding: 5,
                backgroundColor: colors.backgroundSecondary,
                borderRadius: 10,
                marginTop: 10,
              }}
              touchableStyle={{
                padding: 8,
                flexDirection: "row",
                alignItems: "center",
              }}
              textStyle={{ color: colors.textSecondary }}
            />
          </Pressable>
          <Pressable
            onPress={() => {
              setMode("pattern");
            }}
          >
            <CustomButton
              text={"Pattern"}
              style={{
                padding: 5,
                backgroundColor: colors.backgroundSecondary,
                borderRadius: 10,
                marginTop: 10,
              }}
              touchableStyle={{
                padding: 8,
                flexDirection: "row",
                alignItems: "center",
              }}
              textStyle={{ color: colors.textSecondary }}
            />
          </Pressable>
        </View>
        {mode === "code" ? <Text>Code</Text> : <Text>Pattern</Text>}
      </View>
    </Fragment>
  );
};

export default SetAppPassword;
