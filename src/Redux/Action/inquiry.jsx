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