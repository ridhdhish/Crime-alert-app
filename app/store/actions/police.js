import AsyncStorage from "@react-native-async-storage/async-storage";
import env from "../../environment";
import { getCrimeData } from "../../utils/getCrimeData";
import { POLICE_AUTH, POLICE_LOGOUT, SET_IS_POLICE } from "../types";

export const policeAuth = (data, login = false) => async (dispatch) => {
  const pushToken = await JSON.parse(await AsyncStorage.getItem("pushToken"));
  const { location } = await getCrimeData();
  const url = login
    ? `${env.API_URL}/police/auth?login=true&key=police`
    : `${env.API_URL}/police/auth?key=police`;

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
  console.log(body);
  dispatch({
    type: POLICE_AUTH,
    payload: {
      police: body.user,
      recentCrimes: body.user.recentCrimes,
    },
  });
};

export const logout = () => ({
  type: POLICE_LOGOUT,
});

export const setIsPolice = () => ({
  type: SET_IS_POLICE,
});
