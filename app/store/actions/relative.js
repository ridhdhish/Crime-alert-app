import { ADD_RELATIVE, GET_RELATIVE } from "../types";
import env from "../../environment";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const addRelative = (relativeData) => async (dispatch, getState) => {
  const { auth } = getState();
  const secret = await AsyncStorage.getItem("secretToken");
  const secretToken = JSON.parse(secret);
  const isAuth = auth.token;
  const user = auth.user;

  try {
    //"http://10.0.2.2:5000/api/relative/add"
    const response = await fetch(`${env.API_URL}/relative/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: isAuth ? `Bearer ${auth.token}` : "",
      },
      body: JSON.stringify({ ...relativeData, userId: user._id }),
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }
    dispatch({
      type: ADD_RELATIVE,
      payload: data.newRelative,
    });
  } catch (error) {
    console.log(error);
    //dispatch(reportCrimeError(crimeData));
  }
};

export const getAllRelative = () => async (dispatch, getState) => {
  const { auth } = getState();
  const isAuth = auth.token;

  try {
    //"http://10.0.2.2:5000/api/relative/view"
    const response = await fetch(`${env.API_URL}/relative/view`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: isAuth ? `Bearer ${auth.token}` : "",
      },
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }
    dispatch({
      type: GET_RELATIVE,
      payload: data.relatives,
    });
  } catch (err) {
    console.log(err);
  }
};
