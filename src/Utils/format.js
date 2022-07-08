import { stageHeaders } from "../Constants/headers";
import { exceltoJsdate } from "./exceltojsdate";

export const formattedExcelData = (data) => {  
const updateDate = (array, index, newValue) => {
  array[index] = newValue;
}

const getcurrentUser = () => {
  if(localStorage.getItem("userData")){
    return JSON.parse(localStorage.getItem("userData"))?.username;
  } else{
     return "default";
  }
}
  const excelData = [...data];
  excelData.shift();
  const mappedData = excelData.map((value, i) => {
    updateDate(value, 6, exceltoJsdate(value[6]));
    value[22]= new Date().toLocaleString();
    value[23]= getcurrentUser();

    return stageHeaders.reduce((previousValue, currentValue, index) => {
      return {
        ...previousValue,
        [currentValue]: value[index] != "NULL" ? value[index] : null,
      };
    }, {});
  });
  return mappedData;
};
