import * as React from "react";

// Material design
import { Box } from "@mui/material";

interface IProps {
  top: string;
  leftOfTopArrow: string;
  children: React.ReactNode;
}

/***********************************************
 *              MAIN METHOD
 */
const DropdownMenu = ({ top, leftOfTopArrow, children }: IProps) => {

  return (
    <>
      <Box
        className="list-menu"
        component="div"
        sx={{
          visibility: "hidden",
          background: "rgba(255, 255, 255, 1)",
          color: "black",
          fontSize: ".89rem",
          borderRadius: ".2rem",
          padding: ".3rem",
          textAlign: "left",
          boxShadow: "0 0.1rem 0.2rem 0 black",

          position: "absolute",
          top: top,
          right: "0",
          zIndex: 1502,
          width: "16rem",
          marginLeft: "-7.5rem",

          opacity: 0,
          transform: "scale(0)",
          // transition: "opacity 0.75s",

          "&::after": {
            content: '""',
            position: "absolute",
            bottom: "100%",
            left: leftOfTopArrow,
            zIndex: 1509,
            marginLeft: "-0.75rem",
            borderWidth: "0.75rem",
            borderStyle: "solid",
            borderColor: `transparent transparent white transparent`,
          },
        }}
      >
        <Box
          component="div"
          sx={{
            height: "auto",
            maxHeight: "25rem",
            overflowY: "auto",
            padding: "0.25rem",
          }}
        >
          {children}
        </Box>
      </Box>
    </>
  );
};

export default DropdownMenu;
