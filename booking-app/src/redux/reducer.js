import { SET_HOTELS, SET_DESTINATIONS } from "./actions.js";

const initialState = {
  hotels: [],
  destinations: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_HOTELS:
      return { ...state, hotels: action.hotels };
    case SET_DESTINATIONS:
      return { ...state, destinations: action.destinations };
    default:
      return state;
  }
};

export default rootReducer;
