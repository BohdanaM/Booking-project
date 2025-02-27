import { call, put, takeEvery } from "redux-saga/effects";
import axiosInstance from "../axiosInstance.js";

import {
  FETCH_HOTELS,
  FETCH_DESTINATIONS,
  setHotels,
  setDestinations,
} from "./actions";

function* fetchHotelsSaga() {
  try {
    const response = yield call(axiosInstance.get, "/hotels");
    yield put(setHotels(response.data));
  } catch (error) {
    console.error("Error fetching hotels:", error);
  }
}

function* fetchDestinationsSaga() {
  try {
    const response = yield call(axiosInstance.get, "/destinations");
    yield put(setDestinations(response.data));
  } catch (error) {
    console.error("Error fetching destinations:", error);
  }
}

export function* watchFetchData() {
  yield takeEvery(FETCH_HOTELS, fetchHotelsSaga);
  yield takeEvery(FETCH_DESTINATIONS, fetchDestinationsSaga);
}
