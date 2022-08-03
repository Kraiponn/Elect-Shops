import React, { ChangeEvent, KeyboardEvent, useState } from "react";

// Material Design
import { Box, IconButton, InputAdornment, OutlinedInput } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";

interface IProps {
  keyword: string;
  handleSearchChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleKeyPress: (e: KeyboardEvent<HTMLInputElement>) => void;
  handleClickSearchBox: () => void;
}

/***********************************************************************************
 *                                MAIN FUNCTION                                    *
 **********************************************************************************/
const SearchProductBox = ({
  keyword,
  handleSearchChange,
  handleKeyPress,
  handleClickSearchBox,
}: IProps) => {
  const [showSearchBox, setShowSearchBox] = useState<boolean>(false);

  const handleToggleVisibilitySearchBox = () => {
    setShowSearchBox(!showSearchBox);
  };

  return (
    <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "flex-end" }}>
      {showSearchBox ? (
        <OutlinedInput
          id="outlined-adornment-search"
          type="text"
          value={keyword}
          placeholder={`Search...`}
          onChange={handleSearchChange}
          onKeyDown={handleKeyPress}
          size="small"
          sx={{
            border: "none",
            width: "12rem",
            fontFamily: 'Itim',
            background: "rgba(255, 253, 253, 0.506)",
            opacity: "0.75",
            transition: "all .5s ease",
            "&:hover": {
              background: "rgba(255, 253, 253, 0.917)",
              opacity: 1,
              width: "20rem",
            },
          }}
          startAdornment={
            <InputAdornment position="start">
              <IconButton
                aria-label="click to search product"
                onClick={handleClickSearchBox}
                edge="start"
              >
                <SearchIcon fontSize="medium" />
              </IconButton>
            </InputAdornment>
          }
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="click to close search product"
                onClick={handleToggleVisibilitySearchBox}
                edge="end"
              >
                <CloseIcon fontSize="medium" />
              </IconButton>
            </InputAdornment>
          }
        />
      ) : (
        <IconButton
          aria-label="click to search product"
          onClick={handleToggleVisibilitySearchBox}
          edge="end"
        >
          <SearchIcon
            fontSize="large"
            sx={{
              color: "#ffffff",
              "&:hover": {
                transform: "scale(1.1)",
              },
            }}
          />
        </IconButton>
      )}
    </Box>
  );
};

export default SearchProductBox;
