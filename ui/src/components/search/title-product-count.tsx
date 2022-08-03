import React from "react";

// Global state
import { clSecondary } from "@/features/const/colors";

// Components
import {
  Box,
  Typography,
} from "@mui/material";

interface IProps {
  totalProduct: number;
  keyword: string;
}

/***********************************************************************************
 *                                MAIN FUNCTION                                    *
 **********************************************************************************/
export default function TitleProductCount({totalProduct, keyword}: IProps) {
  return (
    <Box sx={{ marginBottom: "2rem" }}>
      <Typography
        variant="h3"
        component="span"
      >
        {`${totalProduct} Results for `}
      </Typography>

      <Typography
        sx={{
          fontFamily: "Prompt",
          fontSize: "1.8rem",
          fontWeight: 500,
          color: clSecondary,
        }}
        component="span"
      >
        {keyword ? `"${keyword}"` : `"all products"`}
      </Typography>
    </Box>
  );
}
