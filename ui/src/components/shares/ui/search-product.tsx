import React, { ChangeEvent, KeyboardEvent } from "react";

// Material Design
import { Box, TextField } from "@mui/material";

interface IProps {
  keyword: string;
  handleSearchChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleKeyPress: (e: KeyboardEvent<HTMLInputElement>) => void;
}

/***********************************************
 *                MAIN METHOD                  *
 **********************************************/
const SearchProduct = ({
  keyword,
  handleSearchChange,
  handleKeyPress,
}: IProps) => {
  return (
    <Box sx={{}}>
      <TextField
        variant="outlined"
        size="small"
        onChange={handleSearchChange}
        onKeyDown={handleKeyPress}
        value={keyword}
        sx={{ background: "rgb(255, 255, 255)", borderRadius: "0.35rem" }}
      />
    </Box>
  );
};

export default SearchProduct;
