import AsyncStorage from "@react-native-async-storage/async-storage";
import env from "../../environment";
import { getCrimeData } from "../../utils/getCrimeData";
import {
  POLICE_AUTH,
  POLICE_LOGOUT,
  REFRESH_POLICE_DATA,
  SET_IS_POLICE,
} from "../types";

export const policeAuth = (data, login = false) => async (dispatch) => {
  const pushToken = await JSON.parse(await AsyncStorage.getItem("pushToken"));
  const { location } = await getCrimeData();
  const url = login
    ? `${env.API_URL}/police/auth?login=true&key=${data.key.toLowerCase()}`
    : `${env.API_URL}/police/auth?key=${data.key.toLowerCase()}`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...data,
      pushToken,
      location: {
        lat: location.lat,
        long: location.long,
      },
    }),
  });
  const body = await response.json();

  if (!response.ok) {
    console.log(body.message);
    throw new Error(body.message);
  }
  await AsyncStorage.setItem("userData", JSON.stringify({ ...body }));
  await AsyncStorage.setItem("police", JSON.stringify(true));
  await AsyncStorage.setItem("policeToken", JSON.stringify(body.token));
  dispatch({
    type: POLICE_AUTH,
    payload: {
      police: body.user,
      recentCrimes: body.user.recentCrimes,
      token: body.token,
    },
  });
  dispatch({
    type: SET_IS_POLICE,
    payload: true,
  });
};

export const logout = () => async (dispatch) => {
  await AsyncStorage.removeItem("userData");
  dispatch({
    type: POLICE_LOGOUT,
  });
  dispatch({
    type: SET_IS_POLICE,
    payload: false,
  });
};

export const setIsPolice = () => ({
  type: SET_IS_POLICE,
  payload: true,
});

export const refreshPoliceData = () => async (dispatch, getState) => {
  try {
    const user = await JSON.parse(await AsyncStorage.getItem("userData"));
    const token = await JSON.parse(await AsyncStorage.getItem("policeToken"));
    const response = await fetch(`${env.API_URL}/police/${user.user._id}`);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
    dispatch({
      type: REFRESH_POLICE_DATA,
      payload: {
        police: data.message,
        token,
      },
    });
  } catch (error) {
    console.log(error.message);
  }
};
