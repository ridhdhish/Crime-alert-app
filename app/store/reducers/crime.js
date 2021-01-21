import { REPORT_CRIME, REPORT_CRIME_ERROR } from "../types";

const initState = {
  crime: null,
  history: [],
};

export const crimeReducer = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case REPORT_CRIME:
      return state;
    case REPORT_CRIME_ERROR:
      console.log("Do Background Sync");
      return {
        ...state,
      };
    default:
      return state;
  }
};
