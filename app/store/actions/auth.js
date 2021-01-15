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
  try {
    const response = await fetch("http://127.0.0.1:5000/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(authData),
    });
    if (!response.ok) {
      throw new Error("Something went wrong");
    }
    const body = await response.json();
    console.log(body);
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};
