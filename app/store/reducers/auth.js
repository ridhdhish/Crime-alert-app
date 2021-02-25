import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  AUTH_ERROR,
  AUTH_USER,
  LOGOUT,
  REFRESH_USER_DATA,
  TRY_AUTO_LOGIN,
  UPDATE_USER,
  SET_CONNECTED_TO_INTERNET,
  LOADED_DATA,
  SEEN_ALERT,
  UPDATE_NOTIFICATION_SETTING,
  SET_IS_POLICE,
} from "../types";

const initState = {
  user: null,
  token: null,
  tryAutoLogin: false,
  isConnected: true,
  loadedData: false,
  isPolice: false,
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

    case LOADED_DATA:
      return {
        ...state,
        loadedData: payload,
      };
    case SEEN_ALERT:
      const recentAlerts = [...state.user.recentAlerts];
      const filteredRecentAlerts = recentAlerts.map((alert) => {
        if (alert.crimeId === payload) {
          alert.isSeen = true;
        }
        return alert;
      });
      return {
        ...state,
        user: {
          ...state.user,
          recentAlerts: filteredRecentAlerts,
        },
      };
    case UPDATE_NOTIFICATION_SETTING:
      return {
        ...state,
        user: {
          ...state.user,
          notificationSetting: payload,
        },
      };

    case SET_IS_POLICE:
      return {
        ...state,
        isPolice: payload,
      };
    default:
      return state;
  }
};
