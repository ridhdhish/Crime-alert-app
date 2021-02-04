import {
  DO_BACK_SYNC,
  GET_AROUND_DATA,
  REPORT_CRIME,
  REPORT_CRIME_ERROR,
} from "../types";
// import { crimePlacesData } from "../../utils/crimeDummyData";

const initState = {
  crime: null,
  place: null,
  history: [],
  crimePlaces: {
    totalCrimes: 0,
    places: [],
  },
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
    case GET_AROUND_DATA:
      return {
        ...state,
        crimePlaces: {
          totalCrimes: payload.totalCrimes,
          places: payload.places,
        },
      };
    case REPORT_CRIME_ERROR:
      return {
        ...state,
        crime: null,
        place: null,
        history: [],
        crimePlaces: {
          totalCrimes: 0,
          places: [],
          crimes: [],
        },
      };
    default:
      return state;
  }
};
