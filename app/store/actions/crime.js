import { REPORT_CRIME, REPORT_CRIME_ERROR } from "../types";
import env from "../../environment";

export const reportCrime = (crimeData) => async (dispatch, getState) => {
  const { auth } = getState();
  try {
    //"http://10.0.2.2:5000/api/crime"
    const response = await fetch(`${env.API_URL}/crime`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.token}`,
      },
      body: JSON.stringify(crimeData),
    });
    const data = await response.json();
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
