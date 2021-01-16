import React, { Fragment } from "react";
import { View, Text, Button, ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { colors } from "../colors";
import { logout } from "../store/actions/auth";

const HomeScreen = (props) => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  return (
    <Fragment>
      {!auth.user ? (
        <ActivityIndicator size="large" color={colors.backgroundPrimary} />
      ) : (
        <View>
          <Text>Home</Text>
          <Text>{auth.user.firstname}</Text>
          <Button
            title="Logout"
            onPress={() => {
              dispatch(logout());
              props.navigation.navigate("Start");
            }}
          />
        </View>
      )}
    </Fragment>
  );
};

export default HomeScreen;
