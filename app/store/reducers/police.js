import { POLICE_AUTH, POLICE_LOGOUT } from "../types";

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
        ...initState,
      };
    default:
      return state;
  }
};
