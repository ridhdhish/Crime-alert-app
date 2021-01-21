import { REPORT_CRIME, REPORT_CRIME_ERROR } from "../types";

export const reportCrime = (crimeData) => async (dispatch, getState) => {
  const { auth } = getState();
  try {
    const response = await fetch("http://10.0.2.2:5000/api/crime", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.token}`,
      },
      body: JSON.stringify({}),
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
