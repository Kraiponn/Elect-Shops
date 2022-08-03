import React from "react";

// Components
import { Box, IconButton, Typography } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";

interface IProps {
  totalProduct: number;
  handleToggleShowFilterResule: () => void;
}

/***********************************************************************************
 *                         -----   MAIN FUNCTION   -----                           *
 **********************************************************************************/
export default function FilterButton({ handleToggleShowFilterResule }: IProps) {
  return (
    <Box
      sx={{
        width: "100%",
        marginTop: "2.5rem",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <IconButton onClick={handleToggleShowFilterResule}>
        <FilterListIcon fontSize="large" />

        <Typography
          variant="h5"
          sx={{ marginLeft: "1rem" }}
        >{`Filter Results`}</Typography>
      </IconButton>
    </Box>
  );
}
