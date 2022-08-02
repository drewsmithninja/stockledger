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
import Autocomplete from '@mui/material/Autocomplete';
import Typography from '@mui/material/Typography';
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Drawer from "@mui/material/Drawer";
import { makeStyles } from "@mui/styles";
import { getInquiryDataRequest } from "../../Redux/Action/inquiry";
import CircularProgress from "@mui/material/CircularProgress";
import { headCells } from "./tableHead";
import SearchIcon from '@mui/icons-material/Search';
import RestartAltIcon from '@mui/icons-material/RestartAlt';


const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const useStyles = makeStyles({
  maindiv: {
    position: "relative",
    width: "calc(95vw - 0px)",
    '& table':{
      '& thead': {
        '& th:nth-child(1)':{
          display: 'none'
       },
       },
      '& tr':{
            '& td:nth-child(1)':{
                  display: 'none'
            },
            '& td:nth-child(29)':{
              display: 'none'
           },
           '& td:nth-child(30)':{
             display: 'none'
          }
      }
  }
},  boxDiv: {
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
  dateField:{
      '& .MuiInput-input': {
        color:  "rgba(102,102,102,1)",
      }
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
  USER: "",
  DATE: "",
}

const InquryScreen = () => {
  const [tabledata, setTabledata] = useState("");
  const [inputValue, setInputValue] = useState();
  const [allData, setAllData] = useState("");
  const [editRows, seteditRows] = useState([]);
  const [updateRow, setUpdateRow] =  useState([]);
  const [loading, setLoading] = useState(false);
  const [isSearch, setSearch] = useState(false);
  const [searchData, setSearchData] = useState(initialsearch);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [open, setOpen] = useState(false);
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const ErrorProceesClasses = useStyles();
  const ErrorProcessingData = useSelector(
    (state) => state.InquiryReducers
  );
  console.log(ErrorProcessingData);
  const dispatch = useDispatch();

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const serializedata = (datatable) => {
    let newTabledata = [];
    if(datatable.length > 0){
      datatable.map( item => {
          const reorder = {
            'ITEM' : null,
            'ERR_MSG': null,
            'DEPT': null,
            'CLASS': null,
            'SUBCLASS':null,
            'LOCATION_TYPE': null,
            'LOCATION': null,
            'TRN_TYPE': "",
            'QTY': "",
            'UNIT_COST': "",
            'UNIT_RETAIL': "",
            'TOTAL_COST': "",
            'TOTAL_RETAIL': "",
            'REF_NO1': "",
            'REF_NO2': "",
            'REF_NO3': "",
            'REF_NO4': "",
            'CURRENCY': "",
            'ERR_SEQ_NO': null,
            'TRAN_SEQ_NO': null
          }
          delete item?.PROCESS_IND;
          delete item?.SELLING_UOM;
          delete item?.TRN_POST_DATE;
          delete item?.REF_ITEM;
          delete item?.REF_ITEM_TYPE;
          delete item?.PACK_QTY;
          delete item?.PACK_COST;
          delete item?.PACK_RETAIL;
          delete item?.CREATE_ID;
          delete item?.CREATE_DATETIME;
          delete item?.REV_NO;
          delete item?.rev_trn_no;
          delete item?.AREF;
            let test = Object.assign(reorder,item);
            newTabledata.push(test); 
    })
    return newTabledata;
  } 
  }

  useEffect(() => {
    if (inputValue) {
      const filteredTable = tabledata.filter(props => 
        Object
          .entries(inputValue)
          .every(([key,val]) => 
            !val.length ||
            props[key]?.toString().toLowerCase().includes(val?.toString().toLowerCase()))
      )
      setTabledata(filteredTable);
    }
  }, [inputValue]);

  useEffect(() => {
    if (ErrorProcessingData.isError) {
      setIsError(true)
    }else if(ErrorProcessingData.isSuccess){
      setIsSuccess(true);
    }else {
      setIsError(false)
      setTabledata("")
    }
  }, [ErrorProcessingData])


useEffect(() => {
  if(isSearch){
    dispatch(getInquiryDataRequest([searchData])) 
  }
},[isSearch])


  useEffect(() => {
        if(ErrorProcessingData?.data?.Data && Array.isArray(ErrorProcessingData?.data?.Data)){
          setTabledata(serializedata(ErrorProcessingData?.data?.Data));
          setAllData(serializedata(ErrorProcessingData?.data?.Data));
          setLoading(false);
          setSearch(false);
        }else {
          setSearch(false)
        }
        
  },[ErrorProcessingData?.data])



  const handleChange = (e) => {
    const { name, value } = e.target;
    if (value == "") {
      setInputValue(prevState => ({
        ...prevState,
        [name]: value
    }));
      setTabledata(allData);
    } else {
      setInputValue(prevState => ({
        ...prevState,
        [name]: value
    }));
    }
  };

const handleSubmit = (event) => {
  event.preventDefault();
    setSearch(true);
    setState({ ...state, 'right': open });
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
  setIsSuccess(false)
}

const onReset = (event) => {
    initialsearch.USER= "";
    initialsearch.DATE= "";
    console.log('datainitial',initialsearch);
      setSearchData(initialsearch)      
      console.log('data',searchData);
      setSearch(false);
      setTabledata("");

}

console.log(searchData);
const searchPanel = () => (
  <Box
    sx={{ width: 350, marginTop: '80px'}}
    role="presentation"
    component="form"
    onSubmit={handleSubmit}
  > <Grid item xs={12} sx={{display:'flex', justifyContent:'center', marginTop: '15px'}}>
         <Stack spacing={2} sx={{ width: 250 }}>
         
            <TextField
              className={ErrorProceesClasses.textField}
              disabled
              margin="normal"
              size="small"
              variant="standard" 
              name="USER"
              label="User"
              type="text"
              sx={{ width: 250 }}
              value={JSON.parse(localStorage.getItem("userData"))?.username}
            />
             <TextField
              className={ErrorProceesClasses.dateField}
              margin="normal"
              size="small"
              variant="standard" 
              name="DATE"
              label="DATE"
              type="date"
              inputProps={{ max:"2022-08-01"}}
              value={searchData.DATE}
              onChange={onChange}
              sx={{ width: 250 }}
              style={{
                color: "#D3D3D3",
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <div>
            <Button
              className={ErrorProceesClasses.textField}
              type="submit"
              variant="contained"
              sx={{ width:'120px'}}
              startIcon={<SearchIcon />}
            >
              Search
            </Button>
            <Button
              variant="contained"
              sx={{ width:'120px'}}
              onClick={onReset}
              startIcon={<RestartAltIcon />}
            >
              Reset
            </Button>
            </div>
            </Stack>
            </Grid>
  </Box>
);

  return (
    <Box className={ErrorProceesClasses.maindiv}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
          <Box className={ErrorProceesClasses.boxDiv}>
            <div className={ErrorProceesClasses.uploaddiv}>
              <h4>Inquiries</h4>
            </div>
          </Box>
        </Grid>
        <Grid item xs={6}>
        <Box display="flex"
              justifyContent="flex-end"
              alignItems="flex-end" className={ErrorProceesClasses.boxDiv}>
            <div className={ErrorProceesClasses.uploaddiv}>
          <Button variant="contained" sx={{ marginTop: '15px', textAlign:'right' }} onClick={toggleDrawer('right', true)} startIcon={<SearchIcon />}>Search</Button>
          <Drawer
            anchor={'right'}
            open={state['right']}
            onClose={toggleDrawer('right', false)}
            transitionDuration={700}
          >
            {searchPanel('right')}
          </Drawer>
       </div>
          </Box>
        </Grid>
      </Grid>

      {loading ? (
                  <CircularProgress color="inherit" />
                ) : (
        tabledata &&
        <Table
          tableData={tabledata}
          //handleDelete={handleDelete}
          handleSearch={handleChange}
          searchText={inputValue}
          handleEdit={true}
          editRows={editRows}
          seteditRows={seteditRows}
          setUpdateRow={setUpdateRow}
          headCells={headCells}
          setTabledata={setTabledata}
          allData={allData}
          pageName="inquiry"
        />
      )}

      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar open={isError || isSuccess} autoHideDuration={3000} onClose={handleMsgClose}>
          <Alert
            onClose={handleMsgClose}
            severity={ErrorProcessingData?.isSuccess ? "success" : "error"}
            sx={{ width: "100%" }}
          >
          {(isSuccess === true)?(ErrorProcessingData?.messgae)?ErrorProcessingData?.messgae:'Data Successfully Fetched':''}
          {(isError === true)?(ErrorProcessingData?.messgae)?ErrorProcessingData?.messgae:'Data Not Found':''}
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

export default InquryScreen;
