import {
  AUTH_USER,
  LOGOUT,
  REFRESH_USER_DATA,
  RELATIVE_ERROR,
  REPORT_CRIME_ERROR,
  TRY_AUTO_LOGIN,
  UPDATE_USER,
  SET_CONNECTED_TO_INTERNET,
  LOADED_DATA,
  UPDATE_NOTIFICATION_SETTING,
  SET_IS_POLICE,
} from "../types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import env from "../../environment";
import * as Notifications from "expo-notifications";

let timer;

export const me = () => async (dispatch, getState) => {
  try {
    const response = await fetch(`${env.API_URL}/user/me`, {
      headers: {
        Authorization: `Bearer ${getState().auth.token}`,
        Accepts: "application/json",
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
    const oldData = await JSON.parse(await AsyncStorage.getItem("userData"));
    AsyncStorage.setItem(
      "userData",
      JSON.stringify({ ...oldData, user: data.message })
    );
    dispatch({
      type: REFRESH_USER_DATA,
      payload: data.message,
    });
  } catch (error) {
    console.log(error.message);
  }
};

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
  let pushToken = await JSON.parse(await AsyncStorage.getItem("pushToken"));
  if (!pushToken) {
    const token = await Notifications.getExpoPushTokenAsync();
    AsyncStorage.setItem("pushToken", JSON.stringify(token.data));
    pushToken = token.data;
  }
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
  dispatch({
    type: SET_IS_POLICE,
    payload: false,
  });
};

export const login = ({ email, password }) => async (dispatch) => {
  const pushToken = await JSON.parse(await AsyncStorage.getItem("pushToken"));
  if (!pushToken) {
    const token = await Notifications.getExpoPushTokenAsync();
    AsyncStorage.setItem("pushToken", JSON.stringify(token.data));
    pushToken = token.data;
  }
  const authData = {
    email,
    password,
  };
  const response = await fetch(`${env.API_URL}/auth/login`, {
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
  dispatch({
    type: SET_IS_POLICE,
    payload: false,
  });
};

export const logout = () => (dispatch) => {
  AsyncStorage.removeItem("userData");
  clearTimeout(timer);
  dispatch({
    type: LOGOUT,
  });
  dispatch({
    type: REPORT_CRIME_ERROR,
  });
  dispatch({
    type: RELATIVE_ERROR,
  });
};

const setLogoutTimer = (expirationTime) => (dispatch) => {
  timer = setTimeout(() => {
    console.log("Logout");
    dispatch(logout());
  }, expirationTime);
};

export const authUser = ({ user, token, expirationTime }) => async (
  dispatch
) => {
  // dispatch(setLogoutTimer(expirationTime));
  await AsyncStorage.setItem("appPassword", JSON.stringify(false));
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

export const setNotificationSetting = (settings) => async (
  dispatch,
  getState
) => {
  try {
    const response = await fetch(`${env.API_URL}/user/notification`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accepts: "application/json",
        Authorization: `Bearer ${getState().auth.token}`,
      },
      body: JSON.stringify(settings),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
    dispatch({
      type: UPDATE_NOTIFICATION_SETTING,
      payload: data.message,
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const setConnectedToInternet = (isConnected) => {
  return {
    type: SET_CONNECTED_TO_INTERNET,
    payload: isConnected,
  };
};

export const setLoadedData = (isLoaded) => {
  return {
    type: LOADED_DATA,
    payload: isLoaded,
  };
};

export const deleteMe = () => async (dispatch, getState) => {
  try {
    const response = await fetch(`${env.API_URL}/user/deleteMe`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accepts: "application/json",
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });
    console.log(data);
    const data = await response.json();
    if (!response.ok) {
      throw new Error();
    }
    await AsyncStorage.clear();
    dispatch(logout());
  } catch (error) {
    console.log(error.message);
  }
};
