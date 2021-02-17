import React from "react";
import { Text, TouchableOpacity } from "react-native";

const SettingOption = ({ Icon, name, title, onPress }) => {
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
      <Icon name={name} size={30} />
      <Text style={{ marginLeft: 15 }}>{title}</Text>
    </TouchableOpacity>
  );
};

export default SettingOption;
