import { REPORT_CRIME, REPORT_CRIME_ERROR } from "../types";
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
    console.log(data);
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
    type: REPORT_CRIME_ERROR,
    payload: crimeData,
  });
};
