export const FETCH_HOTELS = "FETCH_HOTELS";
export const SET_HOTELS = "SET_HOTELS";
export const FETCH_DESTINATIONS = "FETCH_DESTINATIONS";
export const SET_DESTINATIONS = "SET_DESTINATIONS";

export const fetchHotels = () => ({ type: FETCH_HOTELS });
export const setHotels = (hotels) => ({ type: SET_HOTELS, hotels });
export const fetchDestinations = () => ({ type: FETCH_DESTINATIONS });
export const setDestinations = (destinations) => ({
  type: SET_DESTINATIONS,
  destinations,
});
