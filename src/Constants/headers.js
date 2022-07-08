export const stageHeaders = [
"SR_NO",
"ITEM",
"REF_ITEM",
"REF_ITEM_TYPE",
"LOCATION_TYPE", 
"LOCATION",
"TRN_DATE",
"TRN_TYPE",
"QTY",
"PACK_QTY",
"PACK_COST",
"PACK_RETAIL",
"UNIT_COST",
"UNIT_RETAIL",
"TOTAL_COST",
"TOTAL_RETAIL",
"REF_NO1",
"REF_NO2",
"REF_NO3",
"REF_NO4",
"AREF",
"CURRENCY",
"CREATE_DATETIME",
"CREATE_ID",
"REV_NO",
"REV_TRN_NO"
];

export function isHeadersEqual(a, b) {
  return (
    Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((val, index) => val === b[index])
  );
}
