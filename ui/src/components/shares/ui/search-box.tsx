import React, { useState } from "react";
import { useRouter } from "next/router";

// Material Design
import { InputBase } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";

// Global state and Types
import {
  useAppDispatch,
  useAppSelector,
} from "@/features/hooks/use-global-state";
import { fetchProducts } from "@/features/global-state/reducers/product";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.5),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

/****************************************************
 *                  MAIN FUNCTION
 ***************************************************/
const SearchBox = () => {
  const [value, setValue] = useState<string>("");
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isLoading, isSuccess, isError, products } = useAppSelector(
    (state) => state.product
  );

  const handleSearchChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setValue(event.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === "Enter") {
      // console.log("Search key:", value);
      dispatch(fetchProducts(value));
      // router.push({
      //   pathname: "/[search]",
      //   query: { search: "search", keyword: "nginx" },
      // });
    }
  };

  if (!isLoading && isSuccess && products) {
    router.push({
      pathname: "/[search]",
      query: { search: "search", keyword: value },
    });

    // return <div></div>;
    console.log('Search is successfully')
    // router.push('/products')
  }

  return (
    <>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>

        <StyledInputBase
          placeholder="Search…"
          inputProps={{ "aria-label": "search" }}
          onChange={handleSearchChange}
          onKeyDown={handleKeyPress}
          value={value}
        />
      </Search>
    </>
  );
};

export default SearchBox;
