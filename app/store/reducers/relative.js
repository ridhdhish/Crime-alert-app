import { ADD_RELATIVE, GET_RELATIVE } from "../types";

const initState = {
  relatives: [],
};

export const relativeReducer = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_RELATIVE:
      return {
        ...state,
        relatives: [...state.relatives, payload],
      };
    case GET_RELATIVE:
      return {
        ...state,
        relatives: payload,
      };
    default:
      return state;
  }
};
