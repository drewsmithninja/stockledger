import React, { useEffect, useState } from "react";
import Header from "../Header";
import {Table, TableBody, TableCell, TableContainer, TablePagination, TableRow,Paper, Checkbox, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import TableToolbar from "../Toolbar/index";
import "../index.css";

const useStyles = makeStyles({
  tabCell: {
    padding: "6px 6px !important",
    fontSize: "0.7rem !important",
},
});

const CommonTable = ({
  handleClick,
  handleSelectAllClick,
  handleRequestSort,
  handleChangePage,
  isSelected,
  handleDelete,
  handleSearch,
  handleEdit,
  seteditRows,
  editRows,
  setUpdateRow,
  searchText,
  rows,
  selected,
  order,
  orderBy,
  stableSort,
  getComparator,
  page,
  rowsPerPage,
  emptyRows,
  handleChangeRowsPerPage,
  headCells,
  pageName,
}) => {


    const [updateData, setupdateData] = useState({});  
    const rowClasses = useStyles();  

  const onBlur = (e , row) => {
    let temp = {...updateData};
    temp[row?.TRAN_SEQ_NO] = row;
    temp[row?.TRAN_SEQ_NO][e.target.name] = e.target.value; 
    setupdateData(temp)
  }

  useEffect(() => {
    if(setUpdateRow){
    setUpdateRow(updateData);
    }
  },[updateData])

  return (
    <>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer sx={{ }}>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size="small"
          >
            <Header
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              handleSearch={handleSearch}
              searchText={searchText}
              headCells={headCells}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row?.SR_NO?row?.SR_NO:row?.TRAN_SEQ_NO);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row?.SR_NO?row?.SR_NO:row?.TRAN_SEQ_NO}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          onClick={(event) => handleClick(event, row?.SR_NO?row?.SR_NO:row?.TRAN_SEQ_NO)}
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                          style={{
                            color: "#635b5bb8",
                          }}
                        />
                      </TableCell>
                      { editRows?.includes(row?.TRAN_SEQ_NO) ? <>
                        {Object.entries(row).map(([key, value]) => {
                            return <TableCell padding="none" align="left" key={key} className={rowClasses.tabCell}>
                            <TextField 
                            size="small"
                            variant="standard"
                            hide
                            defaultValue={value} name={key} onChange={ (e) => onBlur(e, row)} />
                           </TableCell>
                              }
                      )}
                      </> :           
                      <>
                      {Object.entries(row).map(([key, value])=> 
                          <TableCell align="left" key={key} className={rowClasses.tabCell} sx={(key == 'SR_NO'?'display:none':'')}>
                              {value || "" }
                          </TableCell>
                      )}
                      </> }
                      
                    </TableRow>
                  );
                })}

              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 33 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 20, 30]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        {(pageName != "stage") &&
        <TableToolbar selected={selected} handledelete={handleDelete} edithandle={handleEdit} seteditRows={seteditRows}  />
        }         
        </Paper>
    </>
  );
};

export default CommonTable;
