import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from '@mui/material/Grid';
import Table from "../../Components/Table/index";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import TextField from "@mui/material/TextField";
import Modal from '@mui/material/Modal';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { makeStyles } from "@mui/styles";
import { getErrorProcessingRequest, postErrorProcessingRequest } from "../../Redux/Action/errorProcessing";
import CircularProgress from "@mui/material/CircularProgress";
import { headCells } from "./tableHead";
import SearchIcon from '@mui/icons-material/Search';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SendIcon from '@mui/icons-material/Send';
//import "./index.css";


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
  textField: {
    marginRight: "10px !important",
  },
  popUp: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    backgroundColor: 'white',
    border: '2px solid #000',
    boxShadow: 24,
    padding: '20px 20px 20px 20px',
  },
});

const initialsearch = {
  ITEM: "",
  LOCATION: "",
  TRN_TYPE: "",
  TRN_DATE: "",
  ERR_MSG: "",
  CREATE_ID: ""
}
const ErrorProcessing = () => {
  const [tabledata, setTabledata] = useState("");
  const [inputValue, setInputValue] = useState();
  const [allData, setAllData] = useState("");
  const [editRows, seteditRows] = useState([]);
  const [updateRow, setUpdateRow] =  useState([]);
  const [loading, setLoading] = useState(false);
  const [isSearch, setSearch] = useState(false);
  const [searchData, setSearchData] = useState(initialsearch);
  const [isError, setIsError] = useState(false)
  const [isSubmit, setSubmit] = useState(false);
  const [open, setOpen] = useState(false);
  const ErrorProceesClasses = useStyles();
  const ErrorProcessingData = useSelector(
    (state) => state.ErrorProcessingReducers
  );
  //console.log(ErrorProcessingData);
  const dispatch = useDispatch();
  let today = new Date().toISOString().slice(0, 10);

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
    if (ErrorProcessingData.isError) {
      setIsError(true)
    }
    else {
      setIsError(false)
      setTabledata("")
    }
  }, [ErrorProcessingData])

  useEffect(() => { 
    if(isSubmit){
  dispatch(getErrorProcessingRequest([searchData])) 
    }
},[isSubmit]);

useEffect(() => {
  if(isSearch){
    dispatch(getErrorProcessingRequest([searchData])) 
  }

},[isSearch])

  useEffect(() => {
        if(ErrorProcessingData?.data?.Data && Array.isArray(ErrorProcessingData?.data?.Data)){
          console.log(ErrorProcessingData?.data?.Data);
          setTabledata(ErrorProcessingData?.data?.Data)
          setAllData(ErrorProcessingData?.data?.Data);
          setLoading(false);
          setSubmit(false);
          setSearch(false)
        }else{
          setSearch(false)
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

  const SubmitList = () => {
    if(Object.keys(updateRow).length > 0){
    setLoading(true);
    dispatch(postErrorProcessingRequest(Object.values(updateRow)));
    setSubmit(true);
    }else{

      setOpen(true)
    }
    
  };
const handleSubmit = (event) => {
  event.preventDefault();
    setSearch(true);
}

const onChange = (e) => {
  setSearchData((prev) => {
    return {
      ...prev,
      [e.target.name]: e.target.value,
    };
  });
}

const handleMsgClose = () => {
  setIsError(false)
}

const onReset = (event) => {
    event.preventDefault();
      setSearchData(initialsearch)
      setSearch(false);
      setTabledata("");
}


let newTabledata;
  if(tabledata.length > 0){
   newTabledata =  tabledata.map( item => {
        const reorder = {
          'ITEM' : null,
          'ITEM_DESC': null,
          'DEPT': null,
          'CLASS': null,
          'SUBCLASS':null,
          'REF_ITEM': null,
          'REF_ITEM_TYPE': null,
          'LOCATION_TYPE': null,
          'LOCATION': null,
          'LOCATION_NAME': "",
          'TRN_DATE': "",
          'TRN_TYPE': "",
          'QTY': "",
          'PACK_QTY': "",
          'PACK_COST': "",
          'PACK_RETAIL': "",
          'UNIT_COST': "",
          'UNIT_RETAIL': "",
          'TOTAL_COST': "",
          'TOTAL_RETAIL': "",
          'REF_NO1': "",
          'REF_NO2': "",
          'REF_NO3': "",
          'REF_NO4': "",
          'CURRENCY': "",
          'CREATE_ID': "",
          'CREATE_DATETIME': "",
          'REV_NO': "",
          'REV_TRN_NO': "",
          'ERR_MSG': null,
          'ERR_SEQ_NO': null,
          'TRAN_SEQ_NO': null,
        }
        delete item?.PROCESS_IND;
          let test = Object.assign(reorder,item);
        return test;  
  })
}

  return (
    <Box className={ErrorProceesClasses.maindiv}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={12}>
          <Box className={ErrorProceesClasses.boxDiv}>
            <div className={ErrorProceesClasses.uploaddiv}>
              <h4>Error Processing Data</h4>
            </div>
          </Box>
        </Grid>
      </Grid>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      <Grid item xs={12}>
      <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ mt: 1,display:'flex'}}
          > 
          <Grid item xs={9}>
          {/* <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value="20"
            label="Age"
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
            </Select>
            <TextField
              className={ErrorProceesClasses.textField}
              margin="normal"
              label="CLASS"
              name="CLASS"
              type="text"
              value={searchData.CLASS}
              onChange={onChange}
              autoFocus
            />
            <TextField
              className={ErrorProceesClasses.textField}
              margin="normal"
              label="SUBCLASS"
              name="SUBCLASS"
              type="text"
              value={searchData.SUBCLASS}
              onChange={onChange}
              autoFocus
            /> */}
            <TextField
              className={ErrorProceesClasses.textField}
              margin="normal"
              label="ITEM"
              name="ITEM"
              type="text"
              value={searchData.ITEM}
              onChange={onChange}
              autoFocus
            />
            <TextField
              className={ErrorProceesClasses.textField}
              margin="normal"
              name="LOCATION"
              label="Location"
              type="text"
              value={searchData.LOCATION}
              onChange={onChange}
            />
            <TextField
              className={ErrorProceesClasses.textField}
              margin="normal"
              name="TRN_TYPE"
              label="TRN TYPE"
              type="text"
              value={searchData.TRN_TYPE}
              onChange={onChange}
            />
            <TextField
              className={ErrorProceesClasses.textField}
              margin="normal"
              name="ERR_MSG"
              label="ERR MESSAGE"
              type="text"
              value={searchData.ERR_MSG}
              onChange={onChange}
            />
            <TextField
              className={ErrorProceesClasses.textField}
              margin="normal"
              name="CREATE_ID"
              label="CREATE ID"
              type="text"
              value={searchData.CREATE_ID}
              onChange={onChange}
            />
             <TextField
              className={ErrorProceesClasses.textField}
              margin="normal"
              name="TRN_DATE"
              label="TRN DATE"
              type="date"
              inputProps={{ max:"2022-07-11"}}
              value={searchData.TRN_DATE}
              onChange={onChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
            </Grid>
            <Grid item xs={1}></Grid>
            <Grid item xs={2}>
            <Button
              className={ErrorProceesClasses.textField}
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              startIcon={<SearchIcon />}
            >
              Search
            </Button>
            <Button
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={onReset}
              startIcon={<RestartAltIcon />}
            >
              Reset
            </Button>
            </Grid>
          </Box>
        </Grid>
        </Grid>
      {loading ? (
                  <CircularProgress color="inherit" />
                ) : (
        tabledata &&
        <Table
          tableData={newTabledata}
          //handleDelete={handleDelete}
          handleSearch={handleChange}
          searchText={inputValue}
          handleEdit={true}
          editRows={editRows}
          seteditRows={seteditRows}
          setUpdateRow={setUpdateRow}
          headCells={headCells}
        />
      )}
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
        </Grid>
        {
          tabledata.length > 0 && <Grid item xs={6}>
            <Box
              m={1}
              display="flex"
              justifyContent="flex-end"
              alignItems="flex-end"
            >
              <Button variant="contained" onClick={SubmitList} startIcon={<SendIcon />}>
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

      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar open={isError} autoHideDuration={3000} onClose={handleMsgClose}>
          <Alert
            onClose={handleMsgClose}
            severity={ErrorProcessingData?.isSuccess ? "success" : "error"}
            sx={{ width: "100%" }}
          >
          {ErrorProcessingData?.messgae}
          </Alert>
          </Snackbar>
      </Stack>
      <Modal
        open={open}
        onClose={() => {setOpen(false)}}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={ErrorProceesClasses.popUp}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Note:-
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Please update record before click submit button.
          </Typography>
        </Box>
      </Modal>
    </Box>
  );
};

export default ErrorProcessing;
