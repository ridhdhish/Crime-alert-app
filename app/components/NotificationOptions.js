import React from "react";
import { View, Text, StyleSheet, Switch } from "react-native";
import { colors } from "../colors";
import { sectionStyle } from "../utils/sectionStyle";

const NotificationOptions = ({ title, value, setValue }) => {
  return (
    <View
      style={{
        ...styles.userDetails,
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 5,
      }}
    >
      <Text>{title}</Text>
      <Switch
        thumbColor={colors.backgroundPrimary}
        trackColor={{
          false: colors.textAccent,
          true: colors.backgroundSecondary,
        }}
        value={value}
        onValueChange={(e) => setValue(e.valueOf())}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  ...sectionStyle,
});

export default NotificationOptions;
