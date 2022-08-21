import React from "react";

// Material Design
import { Typography } from "@mui/material";

interface IProps {
  label: string;
  OnClick: () => void;
}

/***********************************************************************************
 *                          ---   MAIN FUNCTION   ---                              *
 **********************************************************************************/
const TextButton = ({ label, OnClick }: IProps) => {
  const handleClick = () => {
    OnClick();
  };
  return (
    <Typography
      variant="subtitle1"
      sx={{
        cursor: "pointer",
        ":hover": {
          textShadow: "2px 2px 3px rgb(1,1,1)",
          transform: "scale(1.1)",
        },
      }}
      onClick={handleClick}
    >
      {`${label}`}
    </Typography>
  );
};

export default TextButton;
