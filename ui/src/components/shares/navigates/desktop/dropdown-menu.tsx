import * as React from "react";

// Material design
import { Box } from "@mui/material";

// Global state and system colors
import { useAppSelector } from "@/features/hooks/use-global-state";
import {
  clDarkHard,
  clDarkMedium,
  clWhite,
  clWhiteGray,
} from "@/features/const/colors";

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
  const { darkMode } = useAppSelector((state) => state.gui);

  return (
    <>
      <Box
        className="dropdown--list-menu"
        component="div"
        sx={{
          boxShadow: darkMode
            ? "0 0rem .7rem rgba(3, 205, 255, 0.596)"
            : "0 0rem .7rem rgba(0, 0, 0, 0.413)",
          background: darkMode ? clDarkMedium : clWhite,
          color: darkMode ? clWhiteGray : clDarkHard,
          fontSize: ".89rem",
          borderRadius: ".2rem",
          padding: ".3rem",
          textAlign: "left",

          position: "absolute",
          top: top,
          right: right,
          zIndex: 1502,
          width: "22rem",
          marginLeft: "-11rem",

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
            borderColor: `transparent transparent ${
              darkMode ? clDarkMedium : clWhite
            } transparent`,
          },
        }}
      >
        {children}
      </Box>
    </>
  );
};

export default DropdownMenu;
