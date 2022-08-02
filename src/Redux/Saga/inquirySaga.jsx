import { call, put, takeLatest } from "redux-saga/effects";
import {
  getInquiryDataSuccess,
  getInquiryDataError,
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