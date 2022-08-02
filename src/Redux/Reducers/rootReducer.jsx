import { combineReducers } from "redux";

import StagingProcessingReducers from "./stagingProcessingReducers";
import ErrorProcessingReducers from "./errorProcessingReducers";
import SystemConfigReducers from "./systemConfigReducers";
import DashboardReducers from "./dashBoardReducers";
import ReconciliationReducers from "./reconciliationReducers";
import InquiryReducers from "./inquiryReducers";

const rootReducer = combineReducers({
  StagingProcessingReducers,
  ErrorProcessingReducers,
  SystemConfigReducers,
  DashboardReducers,
  ReconciliationReducers,
  InquiryReducers,
});

export default rootReducer;
