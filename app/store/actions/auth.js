import { AUTH_ERROR, AUTH_USER, LOGOUT } from "../types";
import AsyncStorage from "@react-native-async-storage/async-storage";

let timer;

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
  const expirationTime = new Date(
    new Date().getTime() + 1000 * 60 * 60 * 24 * 730
  );

  if (!response.ok) {
    console.log(body.message);
    throw new Error(body.message);
  }
  await AsyncStorage.setItem(
    "userData",
    JSON.stringify({ ...body, expirationTime })
  );
  dispatch(authUser({ ...body, expirationTime }));
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
  const expirationTime = new Date(
    new Date().getTime() + 1000 * 60 * 60 * 24 * 730
  );

  if (!response.ok) {
    console.log(body.message);
    throw new Error(body.message);
  }
  await AsyncStorage.setItem(
    "userData",
    JSON.stringify({ ...body, expirationTime })
  );
  dispatch(authUser({ ...body, expirationTime }));
};

export const logout = () => {
  AsyncStorage.removeItem("userData");
  return {
    type: LOGOUT,
  };
};

const setLogoutTimer = (expirationTime) => (dispatch) => {
  timer = setTimeout(() => {
    console.log("Logout");
    dispatch(logout());
  }, 5000);
};

export const authUser = ({ user, token, expirationTime }) => (dispatch) => {
  dispatch(setLogoutTimer(expirationTime));
  dispatch({
    type: AUTH_USER,
    payload: {
      user,
      token,
    },
  });
};
