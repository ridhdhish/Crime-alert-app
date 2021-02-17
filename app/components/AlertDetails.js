import React, { Fragment, useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import dayjs from "dayjs";
import RelativeTime from "dayjs/plugin/relativeTime";
import env from "../environment";
import { useSelector } from "react-redux";
import { colors } from "../colors";

dayjs.extend(RelativeTime);

const AlertDetails = ({ alert }) => {
  const [userData, setUserData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const getUserData = async () => {
      setIsLoading(true);
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
      setIsLoading(false);
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
      {isLoading ? (
        <ActivityIndicator size="large" color={colors.backgroundPrimary} />
      ) : (
        <Fragment>
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
        </Fragment>
      )}
    </View>
  );
};

export default AlertDetails;
