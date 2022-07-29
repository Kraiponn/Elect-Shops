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
      variant="subtitle2"
      sx={{
        cursor: "pointer",
        ":hover": {
          color: `rgba(255, 255, 255, 0.531)`,
        },
      }}
      onClick={handleClick}
    >
      {`${label}`}
    </Typography>
  );
};

export default TextButton;
