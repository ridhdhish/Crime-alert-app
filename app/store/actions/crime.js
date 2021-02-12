import {
  DO_BACK_SYNC,
  REPORT_CRIME,
  GET_AROUND_DATA,
  GET_CITY_DATA,
} from "../types";
import env from "../../environment";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  clearCrimes,
  getCrimeData,
  insertCrime,
} from "../../utils/SQLiteQueries";
import { sendNotification } from "../../utils/sendNotification";

export const reportCrime = (crimeData) => async (dispatch, getState) => {
  const { auth } = getState();
  const secret = await AsyncStorage.getItem("secretToken");
  const secretToken = JSON.parse(secret);
  const isAuth = auth.token;
  console.log(auth.isConnected);
  try {
    // "http://10.0.2.2:5000/api/crime"
    const response = await fetch(`${env.API_URL}/crime`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: isAuth ? `Bearer ${auth.token}` : "",
      },
      body: JSON.stringify(isAuth ? crimeData : { ...crimeData, secretToken }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
    await clearCrimes();
    dispatch({
      type: REPORT_CRIME,
      payload: data,
    });
  } catch (error) {
    if (
      !auth.isConnected ||
      error.message.toLowerCase().includes("network request")
    ) {
      const result = await insertCrime({
        id: Math.random(),
        lat: crimeData.location.lat,
        long: crimeData.location.long,
        address: crimeData.address,
        city: crimeData.city,
        crimeData: crimeData.crimeData,
        state: crimeData.state,
      });
      console.log(result);
    }
    dispatch(reportCrimeError(crimeData));
  }
};

export const reportCrimeError = (crimeData) => async (dispatch) => {
  /**
   * @Todo
   * Do background sync
   */
  dispatch({
    type: DO_BACK_SYNC,
    payload: crimeData,
  });
};

export const getAroundData = ({ lat, long, city }) => async (
  dispatch,
  getState
) => {
  try {
    const response = await fetch(
      `${env.API_URL}/place/around?${lat ? "lat=" + lat : ""}${
        long ? "&long=" + long : ""
      }${city ? "city=" + city.toLowerCase() : ""}`,
      {
        headers: {
          "Content-Type": "application/json",
          Accepts: "application/json",
          Authorization: `Bearer ${getState().auth.token}`,
        },
      }
    );
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
    if (city) {
      dispatch({
        type: GET_CITY_DATA,
        payload: {
          places: data.message,
          totalCrimes: data.message.length,
        },
      });
    } else {
      dispatch({
        type: GET_AROUND_DATA,
        payload: {
          places: data.message.places,
          totalCrimes: data.message.totalCrimes,
          crimes: data.message.crimes,
        },
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const doBackgroundSync = () => async (dispatch, getState) => {
  try {
    const isAuth = getState().auth;
    console.log(isAuth);
    const secret = await AsyncStorage.getItem("secretToken");
    const secretToken = JSON.parse(secret);
    const result = await getCrimeData();
    const crime = result.rows._array[result.rows._array.length - 1];
    console.log(crime);
    const crimeData = {
      location: {
        lat: crime.lat,
        long: crime.log,
      },
      city: crime.city,
      state: crime.state,
      address: crime.address,
      crimeData: crime.crimeData,
    };
    const response = await fetch(`${env.API_URL}/crime`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: isAuth ? `Bearer ${getState().auth.token}` : "",
      },
      body: JSON.stringify(isAuth ? crimeData : { ...crimeData, secretToken }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
    await clearCrimes();
    sendNotification({
      title: "Sent Notification",
      body: "Alert has be reported successfully",
    });
    dispatch({
      type: REPORT_CRIME,
      payload: data,
    });
  } catch (error) {
    console.log(error.message);
  }
};
