import { crimePlacesData } from "../../utils/crimeDummyData";
import { DO_BACK_SYNC, REPORT_CRIME, REPORT_CRIME_ERROR } from "../types";

const initState = {
  crime: null,
  place: null,
  history: [],
  crimePlaces: crimePlacesData,
};

export const crimeReducer = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case REPORT_CRIME:
      return {
        ...state,
        crime: payload.crime,
        place: payload.place,
      };
    case DO_BACK_SYNC:
      console.log("Do Background Sync", payload);
      return {
        ...state,
        crime: null,
        place: null,
        history: [],
      };
    case REPORT_CRIME_ERROR:
      return {
        ...state,
        crime: null,
        place: null,
        history: [],
      };
    default:
      return state;
  }
};
