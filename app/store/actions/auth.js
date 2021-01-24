import { AUTH_USER, LOGOUT, TRY_AUTO_LOGIN, UPDATE_USER } from "../types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import env from "../../environment";

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
  const pushToken = await JSON.parse(AsyncStorage.getItem("pushToken"));
  const response = await fetch(`${env.API_URL}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...authData, pushToken }),
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
  await AsyncStorage.setItem("secretToken", JSON.stringify(body.secretToken));
  dispatch(authUser({ ...body, expirationTime }));
};

export const login = ({ email, password }) => async (dispatch) => {
  const authData = {
    email,
    password,
  };
  const response = await fetch(`${env.API_URL}/auth/login`, {
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
  await AsyncStorage.setItem("secretToken", JSON.stringify(body.secretToken));
  dispatch(authUser({ ...body, expirationTime }));
};

export const logout = () => {
  AsyncStorage.removeItem("userData");
  clearTimeout(timer);
  return {
    type: LOGOUT,
  };
};

const setLogoutTimer = (expirationTime) => (dispatch) => {
  timer = setTimeout(() => {
    console.log("Logout");
    dispatch(logout());
  }, expirationTime);
};

export const authUser = ({ user, token, expirationTime }) => (dispatch) => {
  // dispatch(setLogoutTimer(expirationTime));
  dispatch({
    type: AUTH_USER,
    payload: {
      user,
      token,
    },
  });
};

export const tryAutoLogin = () => {
  return {
    type: TRY_AUTO_LOGIN,
  };
};

export const updateProfile = (user, expirationTime) => async (
  dispatch,
  getState
) => {
  const { auth } = getState();
  try {
    const response = await fetch(`${env.API_URL}/user/updateMe`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.token}`,
      },
      body: JSON.stringify(user),
    });
    const body = await response.json();

    if (!response.ok) {
      console.log(body.message);
      throw new Error(body.message);
    }

    await AsyncStorage.setItem(
      "userData",
      JSON.stringify({ user: body, token: auth.token, expirationTime })
    );

    dispatch({
      type: UPDATE_USER,
      payload: {
        user: body,
      },
    });
  } catch (err) {
    console.log(err);
  }
};
