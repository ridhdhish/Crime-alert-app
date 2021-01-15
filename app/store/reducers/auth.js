import { AUTH_ERROR, LOGIN, LOGOUT, SIGNUP } from "../types";

const initState = {
  user: null,
  token: null,
};

export const authReducer = (state = initState, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOGIN:
      return { ...state };
    case SIGNUP:
      return { ...state };
    case LOGOUT:
      return { ...state };
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
