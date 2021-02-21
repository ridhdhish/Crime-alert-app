import {
  ADD_RELATIVE,
  GET_RELATIVE,
  UPDATE_RELATIVE,
  DELETE_RELATIVE,
} from "../types";
import env from "../../environment";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const addRelative = (relativeData) => async (dispatch, getState) => {
  const { auth } = getState();
  const isAuth = auth.token;

  //"http://10.0.2.2:5000/api/relative/add"
  const response = await fetch(`${env.API_URL}/relative/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: isAuth ? `Bearer ${auth.token}` : "",
    },
    body: JSON.stringify(relativeData),
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }
  dispatch({
    type: ADD_RELATIVE,
    payload: data.newRelative,
  });
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

export const updateRelative = (relative, id) => async (dispatch, getState) => {
  const { auth } = getState();
  const isAuth = auth.token;
  console.log(id);

  try {
    //"http://10.0.2.2:5000/api/relative/update/{id}"
    const response = await fetch(`${env.API_URL}/relative/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: isAuth ? `Bearer ${auth.token}` : "",
      },
      body: JSON.stringify({ ...relative }),
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }
    dispatch({
      type: UPDATE_RELATIVE,
      payload: data.relative,
    });
  } catch (error) {
    console.log(error);
    //dispatch(reportCrimeError(crimeData));
  }
};

export const deleteRelative = (id) => async (dispatch, getState) => {
  const { auth } = getState();
  const isAuth = auth.token;

  try {
    //"http://10.0.2.2:5000/api/relative/delete/{id}"
    const response = await fetch(`${env.API_URL}/relative/delete/${id}`, {
      method: "DELETE",
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
      type: DELETE_RELATIVE,
      payload: id,
    });
  } catch (error) {
    console.log(error);
    //dispatch(reportCrimeError(crimeData));
  }
};
