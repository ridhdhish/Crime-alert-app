import { ADD_RELATIVE, GET_RELATIVE } from "../types";

const initState = {
  relative: [],
};

export const relativeReducer = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_RELATIVE:
      return {
        ...state,
        relative: payload.relative,
      };
    case GET_RELATIVE:
      return {
        ...state,
        relative: payload.relative,
      };
    default:
      return state;
  }
};
