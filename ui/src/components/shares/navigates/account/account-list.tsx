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
];

const AccountListMenu = () => {
  const handleComponents = () => {
    return arr.map((str, index) => {
      return <div key={index}>{`${index}:${str}`}</div>;
    });
  };

  return (
    <>
      <Box
        className="account_list_menu"
        component="div"
        sx={{
          visibility: "hidden",
          width: "15rem",
          background: "rgba(255, 255, 255, 1)",
          color: "black",
          fontSize: ".89rem",
          borderRadius: ".2rem",
          padding: ".5rem",
          textAlign: "left",
          boxShadow: "0 0 .2rem black",
          borderTop: "transparent",

          position: "absolute",
          top: "150%",
          left: "50%",
          zIndex: 1300,
          marginLeft: "-7.5rem",

          opacity: 0,
          transform: "scale(0)",
          transition: "opacity .75s, transform .3s",

          // "&::after": {
          //   content: '""',
          //   position: "absolute",
          //   bottom: "100%",
          //   left: "50%",
          //   zIndex: "1300",
          //   marginLeft: "-0.75rem",
          //   borderWidth: ".75rem",
          //   borderStyle: "inherit",
          //   borderColor: `transparent transparent white transparent`,
          // },
        }}
      >
        <Box
          sx={{
            height: "20rem",
            overflowY: "auto",
          }}
        >
          {handleComponents()}
        </Box>
      </Box>
    </>
  );
};

export default AccountListMenu;
