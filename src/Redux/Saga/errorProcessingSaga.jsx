import { call, put, takeLatest } from "redux-saga/effects";
import {
  getErrorProcessingListSuccess,
  getErrorProcessingError,
  postErrorProcessingSucess,
  postErrorProcessingError
} from "../Action/errorProcessing";
import * as actions from "../constant";
import axiosCall from "../../services/index";
import { API } from "../../services/api";

function* fetchDataSaga(action) {
  try {
    const response = yield call(axiosCall, "GET", API.FETCHERRORDATA);
    if (response?.status == 200) {
      yield put(getErrorProcessingListSuccess({ Data: response?.data }));
    } else {
      yield put(getErrorProcessingError(response?.data?.message));
    }
  } catch (e) {
    yield put(getErrorProcessingError(e.message));
  }
}

export function* ErrorProcessing() {
  yield takeLatest(actions.GET_ERRORPROCESSING_REQUEST, fetchDataSaga);
}


function* updateDataSaga(action) {
  try {
    const response = yield call(axiosCall, "POST", API.UPDATEERRORDATA,action.payload);
    if (response?.status == 200) {
      yield put(postErrorProcessingSucess({ Data: response?.data }));
    } else {
      yield put(postErrorProcessingError(response?.data?.message));
    }
  } catch (e) {
    yield put(postErrorProcessingError(e.message));
  }
}

export function* updateErrorProcessing() {
  yield takeLatest(actions.POST_ERRORPROCESSING_REQUEST, updateDataSaga);
}


