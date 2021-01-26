import { ADD_RELATIVE } from "../types";
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
      payload: data,
    });
  } catch (error) {
    console.log(error);
    //dispatch(reportCrimeError(crimeData));
  }
};

// export const reportCrimeError = (crimeData) => async (dispatch) => {
//   /**
//    * @Todo
//    * Do background sync
//    */
//   dispatch({
//     type: REPORT_CRIME_ERROR,
//     payload: crimeData,
//   });
// };
