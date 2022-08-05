import HomeIcon from "@mui/icons-material/Home";
import SendIcon from "@mui/icons-material/Send";
import DownloadIcon from '@mui/icons-material/Download';
import UploadIcon from '@mui/icons-material/Upload';
import ReceiptIcon from '@mui/icons-material/Receipt';
import RepeatIcon from '@mui/icons-material/Repeat';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import HelpIcon from '@mui/icons-material/Help';
import InventoryIcon from '@mui/icons-material/Inventory';
export const GetItems = () => {
  let json = {
    list: [
      {
        id: 0,
        name: "Home",
        icon: <HomeIcon sx={{color: "#66cdaa"}}/>,
      },
      {
        id: 1,
        name: "System Config",
        icon: <SettingsSuggestIcon sx={{color: "#66cdaa"}}/>,
      },
      {
        id: 2,
        name: "Stage Processing",
        icon: <SendIcon sx={{color: "#66cdaa"}}/>,
        subitems: [
          {
            id: 1,
            name: "Download",
            icon: <DownloadIcon sx={{color: "#66cdaa"}}/>,
          },
          {
            id: 2,
            name: "Upload Inventory",
            icon: <UploadIcon sx={{color: "#66cdaa"}}/>,
          },
          {
            id: 2,
            name: "Upload Non Inventory",
            icon: <UploadIcon sx={{color: "#66cdaa"}}/>,
          },
        ],
      },
      {
        id: 3,
        name: "Transaction Processing",
        icon: <ReceiptIcon sx={{color: "#66cdaa"}}/>,
        subitems: [
          {
            id: 1,
            name: "Error Processing",
          },
        ],
      },
      {
        id: 4,
        name: "Reconciliation Report",
        icon: <RepeatIcon sx={{color: "#66cdaa"}}/>,
        subitems: [
          {
            id: 1,
            name: "Reconciliation",
          },
        ],
      },
      {
        id: 5,
        name: "Transaction Inquiry",
        icon: <HelpIcon sx={{color: "#66cdaa"}}/>,
        subitems: [
          {
            id: 1,
            name: "Inquiry",
          },
        ],
      },
    ],
  };
  return json;
};
