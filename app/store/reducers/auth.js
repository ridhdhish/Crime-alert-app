import { AUTH_ERROR, AUTH_USER, LOGOUT } from "../types";

const initState = {
  user: null,
  token: null,
};

export const authReducer = (state = initState, action) => {
  const { type, payload } = action;

  switch (type) {
    case AUTH_USER:
      console.log(payload);
      return {
        ...state,
        user: payload.user,
        token: payload.token,
      };
    case LOGOUT:
    case AUTH_ERROR:
      return {
        ...state,
        user: null,
        token: null,
      };

    default:
      return state;
  }
};
