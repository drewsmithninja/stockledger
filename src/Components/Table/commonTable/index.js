import React, { useEffect, useState } from "react";
import Header from "../Header";
import {Table, TableBody, TableCell, TableContainer, TablePagination, TableRow,Paper, Checkbox, TextField } from "@mui/material";
import TableToolbar from "../Toolbar/index";



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
}) => {

    const [updateData, setupdateData] = useState({});    

  const onBlur = (e , row) => {
    let temp = {...updateData};
    temp[row?.TRAN_SEQ_NO] = row;
    temp[row?.TRAN_SEQ_NO][e.target.name] = e.target.value; 
    setupdateData(temp)
  }

  useEffect(() => {
    //console.log('updateData',updateData);
    if(setUpdateRow){
    setUpdateRow(updateData);
    }
  },[updateData])

  return (
    <>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
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
                  const isItemSelected = isSelected(row?.TRAN_SEQ_NO);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row?.TRAN_SEQ_NO}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          onClick={(event) => handleClick(event, row?.TRAN_SEQ_NO)}
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
                        {Object.entries(row).map(([key, value]) => 
                             <TableCell align="left" key={key}>
                                       <TextField size='small' defaultValue={value} name={key} onChange={ (e) => onBlur(e, row)} />
                                      </TableCell>       
                      )}
                      {/* <TableCell align="left">
                        {row?.TRAN_SEQ_NO || "NULL"}
                      </TableCell>
                        <TableCell align="left">
                          <TextField size='small' type='number' defaultValue={row?.ITEM} name='ITEM' onBlur={ (e) => onBlur(e, row)} />
                      </TableCell>
                      <TableCell align="left">
                      <TextField size='small' defaultValue={row?.LOCATION} name='LOCATION' onBlur={ (e) => onBlur(e, row)} />
                      </TableCell>
                      <TableCell align="left">
                        <TextField size='small' defaultValue={row?.TRN_DATE} name='TRN_DATE' onBlur={ (e) => onBlur(e, row)} />
                      </TableCell>
                      <TableCell align="left">
                        <TextField size='small' defaultValue={row?.TRN_TYPE} name='TRN_TYPE' onBlur={ (e) => onBlur(e, row)} />
                      </TableCell>
                      <TableCell align="left">
                        <TextField size='small' defaultValue={row?.QTY} name='QTY' onBlur={ (e) => onBlur(e, row)} />
                      </TableCell>
                      <TableCell align="left">
                        <TextField size='small' defaultValue={row?.UNIT_COST} name='UNIT_COST' onBlur={ (e) => onBlur(e, row)} />
                      </TableCell>
                      <TableCell align="left">
                        <TextField size='small' defaultValue={row?.UNIT_RETAIL} name='UNIT_RETAIL' onBlur={ (e) => onBlur(e, row)} />
                      </TableCell>
                      <TableCell align="left">
                        <TextField size='small' defaultValue={row?.TOTAL_COST} name='TOTAL_COST' onBlur={ (e) => onBlur(e, row)} />
                      </TableCell>
                      <TableCell align="left">
                        <TextField size='small' defaultValue={row?.TOTAL_RETAIL} name='TOTAL_RETAIL' onBlur={ (e) => onBlur(e, row)} />
                      </TableCell>
                      <TableCell align="left">
                        <TextField size='small' defaultValue={row?.REF_NO1} name='REF_NO1' onBlur={ (e) => onBlur(e, row)} />
                      </TableCell>
                      <TableCell align="left">
                        <TextField size='small' defaultValue={row?.REF_NO2} name='REF_NO2' onBlur={ (e) => onBlur(e, row)} />
                      </TableCell>
                      <TableCell align="left">
                        <TextField size='small' defaultValue={row?.REF_NO3} name='REF_NO3' onBlur={ (e) => onBlur(e, row)} />
                      </TableCell>
                      <TableCell align="left">
                        <TextField size='small' defaultValue={row?.REF_NO4} name='REF_NO4' onBlur={ (e) => onBlur(e, row)} />
                      </TableCell>
                      <TableCell align="left">
                        <TextField size='small' defaultValue={row?.CURRENCY} name='CURRENCY' onBlur={ (e) => onBlur(e, row)} />
                      </TableCell> */}
                      </> :           
                      <>
                      {Object.entries(row).map(([key, value])=> 
                          <TableCell align="left" key={key}>
                              {value || "NULL" }
                          </TableCell>
                      )}
                      {/* <TableCell align="left">
                        {row?.TRAN_SEQ_NO || "NULL"}
                      </TableCell>
                      <TableCell align="left">{row?.ITEM || "NULL"}</TableCell>
                      <TableCell align="left">
                        {row?.LOCATION || "NULL"}
                      </TableCell>
                      <TableCell align="left">
                        {row?.TRN_DATE || "NULL"}
                      </TableCell>
                      <TableCell align="left">
                        {row?.TRN_TYPE || "NULL"}
                      </TableCell>
                      <TableCell align="left">{row?.QTY || "NULL"}</TableCell>
                      <TableCell align="left">
                        {row?.UNIT_COST || "NULL"}
                      </TableCell>
                      <TableCell align="left">
                        {row?.UNIT_RETAIL || "NULL"}
                      </TableCell>
                      <TableCell align="left">
                        {row?.TOTAL_COST || "NULL"}
                      </TableCell>
                      <TableCell align="left">
                        {row?.TOTAL_RETAIL || "NULL"}
                      </TableCell>
                      <TableCell align="left">
                        {row?.REF_NO1 || "NULL"}
                      </TableCell>
                      <TableCell align="left">
                        {row?.REF_NO2 || "NULL"}
                      </TableCell>
                      <TableCell align="left">
                        {row?.REF_NO3 || "NULL"}
                      </TableCell>
                      <TableCell align="left">
                        {row?.REF_NO4 || "NULL"}
                      </TableCell>
                      <TableCell align="left">
                        {row?.CURRENCY || "NULL"}
                      </TableCell>
                      {(row?.ERR_SEQ_NO) &&
                      <TableCell align="left">
                        {row?.ERR_SEQ_NO || "NULL"}
                      </TableCell>
                      } */}
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
      </Paper>
      <TableToolbar selected={selected} handledelete={handleDelete} edithandle={handleEdit} seteditRows={seteditRows}  />
    </>
  );
};

export default CommonTable;
