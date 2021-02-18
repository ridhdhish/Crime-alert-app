import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { colors } from "../colors";

const SettingOption = ({ Icon, name, title, onPress, color }) => {
  return (
    <TouchableOpacity
      style={{
        marginVertical: 5,
        borderBottomColor: "rgba(0, 0, 0, 0.05)",
        borderBottomWidth: 1,
        flexDirection: "row",
        paddingVertical: 10,
        alignItems: "center",
      }}
      onPress={onPress ? onPress : () => {}}
    >
      <Icon name={name} size={30} color={color ? color : colors.textPrimary} />
      <Text
        style={{ marginLeft: 15, color: color ? color : colors.textPrimary }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default SettingOption;
