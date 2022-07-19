import React, { useState } from "react";
import { useRouter } from "next/router";

// Material Design
import { Box, InputBase, TextField } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";

// Global state and Types
import {
  useAppDispatch,
  useAppSelector,
} from "@/features/hooks/use-global-state";
import { fetchProducts } from "@/features/global-state/reducers/product";


interface IProps {

}

/***********************************************
 *                MAIN METHOD                  *
 **********************************************/
const SearchProduct = ({ }: IProps) => {
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
    }
  };

  if (!isLoading && isSuccess && products) {
    router.push({
      pathname: "/[search]",
      query: { search: "search", keyword: value },
    });
  }

  return (
    <Box sx={{}}>
      <TextField
        variant="outlined"
        size="small"
        onChange={handleSearchChange}
        onKeyDown={handleKeyPress}
        value={value}
        sx={{background: 'rgb(255, 255, 255)'}}
      />
    </Box>
  )
}

export default SearchProduct