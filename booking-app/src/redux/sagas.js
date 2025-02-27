import { call, put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import {
  FETCH_HOTELS,
  FETCH_DESTINATIONS,
  setHotels,
  setDestinations,
} from "./actions";

const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5001";

function* fetchHotelsSaga() {
  try {
    const response = yield call(axios.get, `${apiUrl}/hotels`);
    yield put(setHotels(response.data));
  } catch (error) {
    console.error("Error fetching hotels:", error);
  }
}

function* fetchDestinationsSaga() {
  try {
    const response = yield call(axios.get, `${apiUrl}/destinations`);
    yield put(setDestinations(response.data));
  } catch (error) {
    console.error("Error fetching destinations:", error);
  }
}

export function* watchFetchData() {
  yield takeEvery(FETCH_HOTELS, fetchHotelsSaga);
  yield takeEvery(FETCH_DESTINATIONS, fetchDestinationsSaga);
}
