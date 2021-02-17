import React, { Fragment, useEffect, useState } from "react";
import { View, Text } from "react-native";
import dayjs from "dayjs";
import RelativeTime from "dayjs/plugin/relativeTime";
import env from "../environment";
import { useSelector } from "react-redux";

dayjs.extend(RelativeTime);

const AlertDetails = ({ alert }) => {
  const [userData, setUserData] = useState();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const getUserData = async (userId) => {
      const response = await fetch(`${env.API_URL}/user/${alert.senderId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          Accepts: "application/json",
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setUserData(data.message);
    };
    getUserData();
  }, []);

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
      <Text>
        {dayjs(alert.createdAt).fromNow()} at{" "}
        {dayjs(alert.createdAt).format("hh:mmA")}
      </Text>
      <Text>Contact to Crime location near by police station</Text>
      {userData && (
        <Fragment>
          <Text>{userData.mobileNumber}</Text>
          <Text>{userData.email}</Text>
        </Fragment>
      )}
    </View>
  );
};

export default AlertDetails;
