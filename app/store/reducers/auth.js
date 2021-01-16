import { AUTH_ERROR, AUTH_USER, LOGOUT, TRY_AUTO_LOGIN } from "../types";

const initState = {
  user: null,
  token: null,
  tryAutoLogin: false,
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
