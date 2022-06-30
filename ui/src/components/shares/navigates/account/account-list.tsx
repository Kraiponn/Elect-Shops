import * as React from "react";

import { Box } from "@mui/material";
import { clGrayBlackDark } from "@/features/const/colors";

const arr = [
  "Code Maker Lab",
  "Code Maker Lab",
  "Code Maker Lab",
  "Code Maker Lab",
  "Code Maker Lab",
  "Code Maker Lab",
  "Code Maker Lab",
  "Code Maker Lab",
  "Code Maker Lab",
  "Code Maker Lab",
  "Code Maker Lab",
  "Code Maker Lab",
  "Code Maker Lab",
  "Code Maker Lab",
  "Code Maker Lab",
  "Code Maker Lab",
  "Code Maker Lab",
  "Code Maker Lab",
  "Code Maker Lab",
  "Code Maker Lab",
  "Code Maker Lab",
  "Code Maker Lab",
  "Code Maker Lab",
  "Code Maker Lab",
  "Code Maker Lab",
  "Code Maker Lab",
]

const AccountListMenu = () => {
  const handleComponents = () => {
    return arr.map((str, index) => {
      return (<div key={index}>{`${index}:${str}`}</div>)
    })
  }

  return (
    <>
      <Box
        className="account_list_menu"
        component="div"
        sx={{
          visibility: 'hidden',
          width: '15rem',
          height: '20rem',
          backgroundColor: clGrayBlackDark,
          color: 'white',
          fontSize: '1rem',
          borderRadius: '.5rem',
          // overflowY: 'auto',
          padding: '.5rem',
          textAlign: 'left',
          boxShadow: '0 .2rem .2rem black',

          position: 'absolute',
          top: '105%',
          left: '50%',
          zIndex: 1300,
          marginLeft: '-7.5rem',

          opacity: 0,
          transform: 'scale(0)',
          transition: "opacity 1s, transform .45s",

          "&::after": {
            content: '""',
            position: 'absolute',
            bottom: '100%',
            left: '50%',
            zIndex: '1300',
            marginLeft: '-0.75rem',
            borderWidth: '0.75rem',
            borderStyle: 'solid',
            borderColor: `transparent transparent ${clGrayBlackDark} transparent`,
          }
        }}>
        <Box sx={{
          overflowY: 'auto'
        }}>
          {handleComponents()}
        </Box>
      </Box>
    </>
  );
};

export default AccountListMenu;
