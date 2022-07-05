import React from "react";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import Typography from "@mui/material/Typography";
import { alpha } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import EditIcon from '@mui/icons-material/Edit';

export default function EnhancedTableToolbar(props) {
  const { selected, handledelete, edithandle, seteditRows } = props;
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(selected.length > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {selected.length > 0 && (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {selected.length} selected
        </Typography>
      )}
      {selected.length > 0 && (
        <>
        {(edithandle === true) &&
          <Tooltip title="Edit">
          <IconButton onClick={() => seteditRows(selected)}>
            <EditIcon />
          </IconButton>
        </Tooltip> 
        }  
      <Tooltip title="Delete">
          <IconButton onClick={() => handledelete(selected)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
        </>
      )}
    </Toolbar>
  );
}
