import { AUTH_ERROR, LOGIN, LOGOUT, SIGNUP } from "../types";

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
  if (!response.ok) {
    console.log(body.message);
    dispatch({
      type: AUTH_ERROR,
    });
    throw new Error(body.message);
  }
  return dispatch({
    type: SIGNUP,
    payload: {
      user: body.user,
      token: body.token,
    },
  });
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
  if (!response.ok) {
    console.log(body.message);
    dispatch({
      type: AUTH_ERROR,
    });
    throw new Error(body.message);
  }
  return dispatch({
    type: LOGIN,
    payload: {
      user: body.user,
      token: body.token,
    },
  });
};
