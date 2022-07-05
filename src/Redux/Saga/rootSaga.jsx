import { all, fork } from "redux-saga/effects";
import StagingProcessing from "./stagingProcessingSaga";
import {ErrorProcessing,updateErrorProcessing} from "./errorProcessingSaga";

export function* rootSaga() {
  yield all([
    fork(StagingProcessing),
    fork(ErrorProcessing),
    fork(updateErrorProcessing)
  ]);
}
