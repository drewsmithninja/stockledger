import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from '@mui/material/Grid';
import Table from "../../Components/Table/index";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { makeStyles } from "@mui/styles";
import { getErrorProcessingRequest, postErrorProcessingRequest } from "../../Redux/Action/errorProcessing";
import CircularProgress from "@mui/material/CircularProgress";
import { headCells } from "./tableHead";
import isArray from "redux-actions/lib/utils/isArray";


const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const useStyles = makeStyles({
  maindiv: {
    position: "relative",
    width: "calc(95vw - 64px)",
  },
  boxDiv: {
    textAlign: "initial",
    position: "relative",
    maxWidth: "1400px",
  },
  uploaddiv: {
    display: "flex",
    alignItems: "center",
    marginTop: "50px",
    textAlign: "start",
    gap: 20,
  },
  GobackDiv: {
    cursor: "pointer",
  },
});
const ErrorProcessing = () => {
  const [tabledata, setTabledata] = useState("");
  const [inputValue, setInputValue] = useState();
  const [allData, setAllData] = useState("");
  const [editRows, seteditRows] = useState([]);
  const [updateRow, setUpdateRow] =  useState([]);
  const [loading, setLoading] = useState(false);
  const [isSubmit, setSubmit] = useState(false);
  const StageProceesClasses = useStyles();
  const ErrorProcessingData = useSelector(
    (state) => state.ErrorProcessingReducers
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (inputValue) {
      const filteredTable = tabledata.filter((val) =>
        val[Object.keys(inputValue)[0]]
          ?.toString()
          .toLowerCase()
          .includes(Object.values(inputValue)[0]?.toString().toLowerCase())
      );
      setTabledata(filteredTable);
    }
  }, [inputValue]);

  useEffect(() => { 
        setLoading(true);
      dispatch(getErrorProcessingRequest()) 
  },[]);

  useEffect(() => { 
    if(isSubmit){
  dispatch(getErrorProcessingRequest()) 
    }
},[isSubmit]);

  useEffect(() => {
        if(ErrorProcessingData?.data?.Data && Array.isArray(ErrorProcessingData?.data?.Data)){
          console.log("call in")
          setTabledata(ErrorProcessingData?.data?.Data)
          setAllData(ErrorProcessingData?.data?.Data);
          setLoading(false);
          setSubmit(false);
        }
        
  },[ErrorProcessingData?.data])



  const handleChange = (e) => {
    const { name, value } = e.target;
    if (value == "") {
      setInputValue({
        [name]: value,
      });
      setTabledata(allData);
    } else {
      setInputValue({
        [name]: value,
      });
    }
  };


  const handleDelete = (id) => {
    const data = [...tabledata];
    // const deleteid = id.reduce(function(target, key, index) {
    //     target['TRAN_SEQ_NO'] = key;
    //       return target;
    //   }, {})
    //   dispatch(postErrorProcessingRequest(deleteid));
    const updatedTable = data.filter((val) => {
      return !id.includes(val.TRAN_SEQ_NO);
    });

    setTabledata(updatedTable);
  };
  const SubmitList = () => {
    
    setLoading(true);
    dispatch(postErrorProcessingRequest(Object.values(updateRow)));
    setSubmit(true);
    //window.location.reload();
    
  };
  console.log(tabledata);
  return (
    <Box className={StageProceesClasses.maindiv}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
          <Box className={StageProceesClasses.boxDiv}>
            <div className={StageProceesClasses.uploaddiv}>
              <h3>Error Processing Data</h3>
            </div>
          </Box>
        </Grid>
        {
          tabledata.length > 0 && <Grid item xs={6} style={{ marginTop: '55px' }}>
            <Box
              m={1}
              display="flex"
              justifyContent="flex-end"
              alignItems="flex-end"
            >
              <Button variant="contained" onClick={SubmitList}>
              {loading ? (
                  <CircularProgress color="inherit" />
                ) : (
                  "Submit"
                )}
              </Button>
            </Box>
          </Grid>
        }
      </Grid>
      {loading ? (
                  <CircularProgress color="inherit" />
                ) : (
        tabledata &&
        <Table
          tableData={tabledata}
          handleDelete={handleDelete}
          handleSearch={handleChange}
          searchText={inputValue}
          handleEdit={true}
          editRows={editRows}
          seteditRows={seteditRows}
          setUpdateRow={setUpdateRow}
          headCells={headCells}
        />
      )}

      <Stack spacing={2} sx={{ width: "100%" }}>
      <Snackbar
          autoHideDuration={4000}
        >
         <Alert severity="error" sx={{ width: "100%" }}>
            Data Updated Sucessfully
          </Alert></Snackbar>
      </Stack>
    </Box>
  );
};

export default ErrorProcessing;

