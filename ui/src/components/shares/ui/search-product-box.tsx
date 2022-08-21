import React, { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";

// Material Design
import { Box, IconButton, InputAdornment, OutlinedInput } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

// Global state
import { useAppSelector } from "@/features/hooks/use-global-state";
import { clDarkMedium } from "@/features/const/colors";

interface IProps {}

/***********************************************************************************
 *                                MAIN FUNCTION                                    *
 **********************************************************************************/
const SearchProductBox = ({}: IProps) => {
  const router = useRouter();
  const { t } = useTranslation("common");
  const [showSearchBox, setShowSearchBox] = useState<boolean>(false);
  const [searchKey, setSearchKey] = useState<string>("");
  const { currentLocale, darkMode } = useAppSelector((state) => state.gui);

  const handleToggleVisibilitySearchBox = () => {
    setShowSearchBox(!showSearchBox);
  };

  const handleOnClearSearchBox = () => {
    setSearchKey("");
  };

  const handleSearchChange = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setSearchKey(event.target.value);
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.code === "Enter") {
      // console.log("Search key:", searchKey);
      handleNavigateToSearchProduct();
    }
  };

  const handleClickSearchBox = () => {
    handleNavigateToSearchProduct();
  };

  const handleNavigateToSearchProduct = () => {
    if (router.pathname === "/search")
      router.replace({
        pathname: "/search",
        query: { keyword: searchKey ? searchKey : "" },
      });
    else
      router.push({
        pathname: "/search",
        query: { keyword: searchKey ? searchKey : "" },
      });
  };

  //############################################
  //             LIFE CYCLE METHOD
  //############################################
  useEffect(() => {
    router.push(router.asPath, router.asPath, {
      locale: currentLocale,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLocale]);

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        justifyContent: "flex-end",
        mr: "1rem",
      }}
    >
      {showSearchBox ? (
        <OutlinedInput
          id="outlined-adornment-search"
          type="text"
          value={searchKey}
          placeholder={t("topNavigation.searchBox")}
          onChange={handleSearchChange}
          onKeyDown={handleKeyPress}
          size="small"
          sx={{
            border: "none",
            width: "12rem",
            fontFamily: "Prompt",
            background: darkMode
              ? "rgba(255, 253, 253, 0.046)"
              : "rgba(255, 253, 253, 0.506)",
            opacity: "0.75",
            transition: "all .5s ease",
            "&:hover": {
              background: darkMode ? clDarkMedium : "rgb(255, 253, 253, 0.99)",
              opacity: 1,
              width: "20rem",
              "& .search-box_sicon": {
                display: "none",
              },
              "& .search-box_ext-sb": {
                display: "block",
              },
            },
          }}
          startAdornment={
            <InputAdornment position="start">
              <IconButton
                aria-label="click to search product"
                // onClick={handleClickSearchBox}
                edge="start"
                sx={{ background: "transparent" }}
              >
                <SearchIcon
                  className="search-box_sicon"
                  sx={{ display: "block" }}
                  fontSize="medium"
                />
                <HighlightOffIcon
                  className="search-box_ext-sb"
                  sx={{ display: "none" }}
                  fontSize="medium"
                  onClick={handleToggleVisibilitySearchBox}
                />
              </IconButton>
            </InputAdornment>
          }
          endAdornment={
            searchKey ? (
              <InputAdornment position="end">
                <IconButton
                  aria-label="click to clear search product"
                  onClick={handleOnClearSearchBox}
                  edge="end"
                >
                  <CloseIcon fontSize="medium" />
                </IconButton>
              </InputAdornment>
            ) : null
          }
        />
      ) : (
        <IconButton
          aria-label="click to search product"
          onClick={handleToggleVisibilitySearchBox}
          edge="end"
        >
          <SearchIcon
            fontSize="medium"
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
