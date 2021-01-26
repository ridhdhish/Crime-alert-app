import { ADD_RELATIVE } from "../types";

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
    // case REPORT_CRIME_ERROR:
    //   console.log("Do Background Sync", payload);
    //   return {
    //     ...state,
    //   };
    default:
      return state;
  }
};
