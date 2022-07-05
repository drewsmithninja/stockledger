import { createAction } from "redux-actions";
import * as actions from "../constant";

export const getErrorProcessingRequest = createAction(
  actions.GET_ERRORPROCESSING_REQUEST
);
export const getErrorProcessingListSuccess = createAction(
  actions.GET_ERRORPROCESSING_SUCCESS
);
export const getErrorProcessingError = createAction(
  actions.GET_ERRORPROCESSING_ERROR
);
export const postErrorProcessingRequest = createAction(
      actions.POST_ERRORPROCESSING_REQUEST
);
export const postErrorProcessingSucess = createAction(
      actions.POST_ERRORPROCESSING_SUCCESS
);
export const postErrorProcessingError = createAction(
      actions.POST_ERRORPROCESSING_ERROR
);
