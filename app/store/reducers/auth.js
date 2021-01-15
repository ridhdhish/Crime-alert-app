import { AUTH_ERROR, LOGIN, LOGOUT, SIGNUP } from "../types";

const initState = {
  user: null,
  token: null,
};

export const authReducer = (state = initState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SIGNUP:
    case LOGIN:
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
