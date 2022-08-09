import { createAction } from "redux-actions";
import * as actions from "../constant";

export const getInquiryDataRequest = createAction(
  actions.GET_INQUIRYDATA_REQUEST
);
export const getInquiryDataSuccess = createAction(
  actions.GET_INQUIRYDATA_SUCCESS
);
export const getInquiryDataError = createAction(
  actions.GET_INQUIRYDATA_ERROR
);
export const getClassDataRequest = createAction(
  actions.GET_CLASSDATA_REQUEST
);
export const getClassDataSuccess = createAction(
actions.GET_CLASSDATA_SUCCESS
);
export const getClassDataError = createAction(
actions.GET_CLASSDATA_ERROR
);
export const getLocationDataRequest = createAction(
actions.GET_LOCATIONDATA_REQUEST
);
export const getLocationDataSuccess = createAction(
actions.GET_LOCATIONDATA_SUCCESS
);
export const getLocationDataError = createAction(
actions.GET_LOCATIONDATA_ERROR
);