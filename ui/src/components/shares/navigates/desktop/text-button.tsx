import React from "react";

import { clRedMain, clWhite } from "@/features/const/colors";
import { Typography } from "@mui/material";

interface IProps {
  label: string;
  OnClick: () => void;
}

/****************************************************
 *  MAIN METHOD
 */
const TextButton = ({ label, OnClick }: IProps) => {
  const handleClick = () => {
    OnClick();
  };
  return (
    <Typography
      variant="h5"
      sx={{
        cursor: "pointer",
        ":hover": {
          // color: `rgba(255, 255, 255, 0.531)`,
          textShadow: '2px 2px 3px rgb(1,1,1)',
          transform: 'scale(1.1)'
        },
      }}
      onClick={handleClick}
    >
      {`${label}`}
    </Typography>
  );
};

export default TextButton;
