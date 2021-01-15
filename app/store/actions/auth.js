import { AUTH_ERROR, AUTH_USER, LOGOUT } from "../types";
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  // if (!response.ok) {
  //   console.log(body.message);
  //   dispatch({
  //     type: AUTH_ERROR,
  //   });
  //   throw new Error(body.message);
  // }
  dispatch(authUser(body, response));
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
  dispatch(authUser(body, response));
};

const authUser = (body, response) => {
  if (!response.ok) {
    console.log(body.message);
    throw new Error(body.message);
  }
  await AsyncStorage.setItem('userData', body);
  return {
    type: AUTH_USER,
    payload: {
      user: body.user,
      token: body.token
    }
  }
}

export const logout = () => {
  return {
    type: LOGOUT,
  }
}

export const AutoLogin = () => async (dispatch) => {
  try {
    const userData = await AsyncStorage.getItem("userData");
    if(!userData) {
      return dispatch(logout());
    }
  } catch (error) {
    dispatch({
      type: AUTH_ERROR
    })
  }
}