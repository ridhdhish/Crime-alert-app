import {
  POLICE_AUTH,
  POLICE_LOGOUT,
  REFRESH_POLICE_DATA,
  SEEN_ALERT_POLICE,
} from "../types";

const initState = {
  police: null,
  recentCrimes: [],
  token: null,
};

export const policeReducer = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case POLICE_AUTH:
      return {
        ...state,
        police: payload.police,
        recentCrimes: payload.recentCrimes,
        token: payload.token,
      };

    case POLICE_LOGOUT:
      return {
        police: null,
        recentCrimes: [],
        token: null,
      };
    case REFRESH_POLICE_DATA:
      return {
        ...state,
        police: payload.police,
        recentCrimes: payload.police.recentAlerts,
        token: payload.token,
      };
    case SEEN_ALERT_POLICE:
      const recentAlerts = [...state.police.recentAlerts];
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
    default:
      return state;
  }
};
