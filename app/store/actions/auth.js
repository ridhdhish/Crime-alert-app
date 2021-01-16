import { AUTH_ERROR, AUTH_USER, LOGOUT } from "../types";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const signup = ({
  email,
  password,
  firstname,
  lastname,
  DOB,
  mobileNumber,
  address,
}) => async (dispatch) => {
  const authData = {
    email,
    password,
    firstname,
    lastname,
    DOB,
    mobileNumber,
    address,
  };
  const response = await fetch("http://10.0.2.2:5000/api/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(authData),
  });
  const body = await response.json();
  const expirationTime = new Date(new Date().getTime() + 1000 * 60 * 60 * 23);

  if (!response.ok) {
    console.log(body.message);
    throw new Error(body.message);
  }
  await AsyncStorage.setItem(
    "userData",
    JSON.stringify({ ...body, expirationTime })
  );
  dispatch(authUser(body));
};

export const login = ({ email, password }) => async (dispatch) => {
  const authData = {
    email,
    password,
  };
  const response = await fetch("http://10.0.2.2:5000/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(authData),
  });
  const body = await response.json();
  const expirationTime = new Date(new Date().getTime() + 1000 * 60 * 60 * 23);

  if (!response.ok) {
    console.log(body.message);
    throw new Error(body.message);
  }
  await AsyncStorage.setItem(
    "userData",
    JSON.stringify({ ...body, expirationTime })
  );
  dispatch(authUser(body));
};

export const logout = () => {
  return {
    type: LOGOUT,
  };
};

export const authUser = ({ user, token }) => {
  return {
    type: AUTH_USER,
    payload: {
      user,
      token,
    },
  };
};
