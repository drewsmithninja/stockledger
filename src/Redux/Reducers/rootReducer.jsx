import { combineReducers } from "redux";

import StagingProcessingReducers from "./stagingProcessingReducers";
import ErrorProcessingReducers from "./errorProcessingReducers";

const rootReducer = combineReducers({
  StagingProcessingReducers,
  ErrorProcessingReducers
});

export default rootReducer;
