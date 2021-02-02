import { DO_BACK_SYNC, REPORT_CRIME, GET_AROUND_DATA } from "../types";
import env from "../../environment";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const reportCrime = (crimeData) => async (dispatch, getState) => {
  const { auth } = getState();
  const secret = await AsyncStorage.getItem("secretToken");
  const secretToken = JSON.parse(secret);
  const isAuth = auth.token;

  try {
    //"http://10.0.2.2:5000/api/crime"
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
    dispatch({
      type: REPORT_CRIME,
      payload: data,
    });
  } catch (error) {
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
      }${city ? "city=" + city : ""}`,
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
    dispatch({
      type: GET_AROUND_DATA,
      payload: {
        places: data.message.places,
        totalCrimes: data.message.totalCrimes,
      },
    });
  } catch (error) {
    console.log(error.message);
  }
};
