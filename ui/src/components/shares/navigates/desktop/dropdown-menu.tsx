import * as React from "react";

// Material design
import { Box } from "@mui/material";

interface IProps {
  top: string;
  right: string;
  leftOfTopArrow: string;
  children: React.ReactNode;
}

/***********************************************************************************
 *                          ---   MAIN FUNCTION   ---                              *
 **********************************************************************************/
const DropdownMenu = ({ top, right, leftOfTopArrow, children }: IProps) => {
  return (
    <>
      <Box
        className="dropdown--list-menu"
        component="div"
        sx={{
          boxShadow: "0 0rem .7rem rgb(0, 0, 0)",
          background: "rgba(255, 255, 255, 1)",
          color: "black",
          fontSize: ".89rem",
          borderRadius: ".2rem",
          padding: ".3rem",
          textAlign: "left",

          position: "absolute",
          top: top,
          right: right,
          zIndex: 1502,
          width: "18rem",
          marginLeft: "-9rem",

          opacity: 0,
          visibility: "hidden",
          transform: "scale(0)",

          "&::after": {
            content: '""',
            position: "absolute",
            bottom: "100%",
            left: leftOfTopArrow,
            zIndex: 1509,
            marginLeft: "-0.89rem",
            borderWidth: "0.89rem",
            borderStyle: "solid",
            borderColor: `transparent transparent white transparent`,
          },
        }}
      >
        {children}
      </Box>
    </>
  );
};

export default DropdownMenu;
