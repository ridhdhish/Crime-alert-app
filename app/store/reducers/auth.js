import {
  AUTH_ERROR,
  AUTH_USER,
  LOGOUT,
  REFRESH_USER_DATA,
  TRY_AUTO_LOGIN,
  UPDATE_USER,
  SET_CONNECTED_TO_INTERNET,
} from "../types";

const initState = {
  user: null,
  token: null,
  tryAutoLogin: false,
  isConnected: true,
};

export const authReducer = (state = initState, action) => {
  const { type, payload } = action;

  switch (type) {
    case AUTH_USER:
      return {
        ...state,
        user: payload.user,
        token: payload.token,
        tryAutoLogin: true,
      };
    case TRY_AUTO_LOGIN:
      return {
        ...state,
        tryAutoLogin: true,
      };
    case REFRESH_USER_DATA:
      return {
        ...state,
        user: payload,
      };
    case LOGOUT:
    case AUTH_ERROR:
      return {
        ...state,
        user: null,
        token: null,
        tryAutoLogin: true,
      };

    case UPDATE_USER:
      return {
        ...state,
        user: payload.user,
      };

    case SET_CONNECTED_TO_INTERNET:
      return {
        ...state,
        isConnected: payload,
      };

    default:
      return state;
  }
};
