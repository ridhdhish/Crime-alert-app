import {
  ADD_RELATIVE,
  GET_RELATIVE,
  UPDATE_RELATIVE,
  DELETE_RELATIVE,
  RELATIVE_ERROR,
} from "../types";

const initState = {
  relatives: [],
};

export const relativeReducer = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case RELATIVE_ERROR:
      return {
        ...state,
        relatives: [],
      };
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
    case UPDATE_RELATIVE:
      //console.log("Payload: ", payload);
      const oldState = [...state.relatives];
      const index = oldState.findIndex(
        (relative) => relative._id === payload._id
      );
      oldState[index] = payload;
      return {
        ...state,
        relatives: oldState,
      };
    case DELETE_RELATIVE:
      const newRelatives = state.relatives.filter(
        (relative) => relative._id !== payload
      );
      return {
        ...state,
        relatives: newRelatives,
      };
    default:
      return state;
  }
};
