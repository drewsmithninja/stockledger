import { call, put, takeLatest } from "redux-saga/effects";
import {
  getInquiryDataSuccess,
  getInquiryDataError,
  getLocationDataSuccess,
  getLocationDataError,
  getClassDataError,
  getClassDataSuccess
} from "../Action/inquiry";
import * as actions from "../constant";
import axiosCall from "../../services/index";
import { API } from "../../services/api";

function* fetchDataSaga(action) {
  try {
    const response = yield call(axiosCall, "POST", API.FETCHERRSTAGESATA,action.payload);
    console.log(response);
    if (response?.data?.status == 500) {
      yield put(getInquiryDataError({Data: response?.data}));
    } else {
      yield put(getInquiryDataSuccess({ Data: response?.data }));
    }
  } catch (e) {
    yield put(getInquiryDataError(e.message));
  }
}

export function* InquiryData() {
  yield takeLatest(actions.GET_INQUIRYDATA_REQUEST, fetchDataSaga);
}


function* getClassDataSaga(action) {
  try {
    const response = yield call(axiosCall, "POST", API.GETCLASSDATA,action.payload);
    //console.log(response);
    if (response?.status == 200) {
      yield put(getClassDataSuccess({ itemData: response?.data }));
    } else {
      yield put(getClassDataError(response?.data?.message));
    }
  } catch (e) {
    yield put(getClassDataError(e.message));
  }
}

export function* getClassData() {
  yield takeLatest(actions.GET_CLASSDATA_REQUEST, getClassDataSaga);
}

function* getLocationDataSaga(action) {
  try {
    const response = yield call(axiosCall, "POST", API.GETLOCATIONDATA,action.payload);
    //console.log(response);
    if (response?.status == 200) {
      yield put(getLocationDataSuccess({ locationData: response?.data }));
    } else {
      yield put(getLocationDataError(response?.data?.message));
    }
  } catch (e) {
    yield put(getLocationDataError(e.message));
  }
}

export function* getLocationData() {
  yield takeLatest(actions.GET_LOCATIONDATA_REQUEST, getLocationDataSaga);
}