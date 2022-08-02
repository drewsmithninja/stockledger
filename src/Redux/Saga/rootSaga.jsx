import { all, fork } from "redux-saga/effects";
import StagingProcessing from "./stagingProcessingSaga";
import {ErrorProcessing,updateErrorProcessing,getClassData, getLocationData} from "./errorProcessingSaga";
import {updateSystemConfig, SystemConfig} from "./systemConfigSaga";
import { DailyCountData,StageCountData,ErrorCountData } from "./dashBoardSaga";
import { DailySkuRollupData,getLocationRecData,getDeptRecData  } from "./reconciliationSaga"; 
import { InquiryData } from "./inquirySaga";

export function* rootSaga() {
  yield all([
    fork(StagingProcessing),
    fork(ErrorProcessing),
    fork(updateErrorProcessing),
    fork(getClassData),
    fork(getLocationData),
    fork(SystemConfig),
    fork(updateSystemConfig),
    fork(DailyCountData),
    fork(StageCountData),
    fork(ErrorCountData),
    fork(DailySkuRollupData),
    fork(getDeptRecData),
    fork(getLocationRecData),
    fork(InquiryData)
  ]);
}
