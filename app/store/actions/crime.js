import {
  DO_BACK_SYNC,
  REPORT_CRIME,
  GET_AROUND_DATA,
  GET_CITY_DATA,
} from "../types";
import env from "../../environment";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { insertCrime } from "../../utils/SQLiteQueries";

export const reportCrime = (crimeData) => async (dispatch, getState) => {
  const { auth } = getState();
  const secret = await AsyncStorage.getItem("secretToken");
  const secretToken = JSON.parse(secret);
  const isAuth = auth.token;
  console.log(auth.isConnected);
  try {
    const result = await insertCrime({
      id: Math.random(),
      lat: crimeData.location.lat,
      long: crimeData.location.long,
      address: crimeData.address,
      city: crimeData.city,
      crimeData: crimeData.crimeData,
      state: crimeData.state,
    });

    //"http://10.0.2.2:5000/api/crime"
    // const response = await fetch(`${env.API_URL}/crime`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: isAuth ? `Bearer ${auth.token}` : "",
    //   },
    //   body: JSON.stringify(isAuth ? crimeData : { ...crimeData, secretToken }),
    // });
    // const data = await response.json();

    // if (!response.ok) {
    //   throw new Error(data.message);
    // }
    // dispatch({
    //   type: REPORT_CRIME,
    //   payload: data,
    // });
  } catch (error) {
    console.log(error.message);
    // dispatch(reportCrimeError(crimeData));
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
