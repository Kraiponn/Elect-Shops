import * as React from "react";

import { Box } from "@mui/material";

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
  // "Code Maker Lab",
  // "Code Maker Lab",
  // "Code Maker Lab",
  // "Code Maker Lab",
];

const ListMenu = () => {
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
          width: "12rem",
          background: "rgba(255, 255, 255, 1)",
          color: "black",
          fontSize: ".89rem",
          borderRadius: ".2rem",
          padding: ".3rem",
          textAlign: "left",
          boxShadow: "0 0 .2rem black",
          // borderTop: "transparent",

          position: "absolute",
          top: "120%",
          left: "50%",
          zIndex: 1302,
          marginLeft: "-6rem",

          opacity: 0,
          transform: "scale(0)",
          transition: "opacity 0.75s, transform 0.3s",

          "&::after": {
            content: '""',
            position: "absolute",
            bottom: "100%",
            left: "50%",
            zIndex: 1309,
            marginLeft: "-0.75rem",
            borderWidth: ".75rem",
            borderStyle: "inherit",
            borderColor: `transparent transparent white transparent`,
          },
        }}
      >
        <Box
          sx={{
            height: 'auto',
            maxHeight: "20rem",
            overflowY: "auto",
          }}
        >
          {handleComponents()}
        </Box>
      </Box>
    </>
  );
};

export default ListMenu;
