import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from '@mui/material/Grid';
import { ExcelRenderer } from "react-excel-renderer";
import Table from "../../Components/Table/index";
import { isHeadersEqual, stageHeaders } from "../../Constants/headers";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { makeStyles } from "@mui/styles";
import { formattedExcelData } from "../../Utils/format";
import { resetStageProcessing, getStageProcessingRequest } from "../../Redux/Action/staginProcessing";
import CircularProgress from "@mui/material/CircularProgress";
import {headCells} from './tableHead';


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
const StageProcessing = () => {
  const [tabledata, setTabledata] = useState("");
  const [isValidExcel, setIsValidExcel] = useState(true);
  const [inputValue, setInputValue] = useState();
  const [allData, setAllData] = useState("");
  const [isError, setIsError] = useState(false)
  const StageProceesClasses = useStyles();
  const StagingProcessing = useSelector(
    (state) => state.StagingProcessingReducers
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
    if (StagingProcessing.isError) {
      setIsError(true)
    }
    else {
      setIsError(false)
    }
  }, [StagingProcessing])

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

  const handleCapture = ({ target }) => {
    dispatch(resetStageProcessing());
    setIsValidExcel(true);
    let fileObj = target.files[0];

    ExcelRenderer(fileObj, (err, resp) => {
      if (isHeadersEqual(resp.rows[0], stageHeaders)) {
        const formatData = formattedExcelData(resp.rows);
        setTabledata(formatData);
        setAllData(formatData);
      } else {
        setIsValidExcel(false);
      }
    });
  };

  const handleClose = () => {
    setIsValidExcel(true);
  };

  const handleDelete = (id) => {
    const data = [...tabledata];
    const updatedTable = data.filter((val) => {
      return !id.includes(val.SR_NO);
    });
    setTabledata(updatedTable);
  };

  const SubmitList = () => {
    dispatch(getStageProcessingRequest(JSON.stringify(tabledata)));
  };

  const handleMsgClose = () => {
    setIsError(false)
  }

  return (
    <Box className={StageProceesClasses.maindiv}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
          <Box className={StageProceesClasses.boxDiv}>
            <div className={StageProceesClasses.uploaddiv}>
              <h3>Stage Processing Data</h3>
              <Button variant="contained" component="label">
                Upload File
                <input onChange={handleCapture} type="file" hidden />
              </Button>
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
                {StagingProcessing?.isLoading ? (
                  <CircularProgress color="inherit" />
                ) : (
                  "Submit"
                )}
              </Button>
            </Box>
          </Grid>
        }
      </Grid>

      {tabledata && (
        <Table
          tableData={tabledata}
          handleDelete={handleDelete}
          handleSearch={handleChange}
          searchText={inputValue}
          headCells={headCells}
        />
      )}
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar open={isError || StagingProcessing?.isSuccess} autoHideDuration={3000} onClose={handleMsgClose}>
          <Alert
            onClose={handleMsgClose}
            severity={StagingProcessing?.isSuccess ? "success" : "error"}
            sx={{ width: "100%" }}
          >
            {StagingProcessing?.messgae}
          </Alert>
        </Snackbar>
      </Stack>
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar
          open={!isValidExcel}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            PLEASE UPLOAD A VALID FILE !
          </Alert>
        </Snackbar>
      </Stack>
    </Box>
  );
};

export default StageProcessing;
