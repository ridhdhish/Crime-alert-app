import React, { useEffect } from "react";
import { View, Text } from "react-native";
import dayjs from "dayjs";
import RelativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(RelativeTime);

const AlertDetails = ({ alert }) => {
  useEffect(() => {}, []);

  return (
    <View>
      <Text
        style={{
          marginVertical: 15,
          fontSize: 24,
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        Alert Details
      </Text>
      <Text>{alert.title}</Text>
      <Text>{dayjs(alert.createdAt).fromNow()}</Text>
      <Text>Contact to Crime location near by police station</Text>
    </View>
  );
};

export default AlertDetails;
