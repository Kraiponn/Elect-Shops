// Material design
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { getHttpErrorObject, http } from "@/features/services";
import { AxiosError } from "axios";
import {
  IErorrResponseData,
  IProduct,
  IProductResponse,
} from "@/features/types";

import { Box, TextField, Toolbar } from "@mui/material";

// Components
import DefautLayout from "@/components/shares/layouts/defaut-layout";
import Content from "@/components/cart/content";
import ErrorShow from "@/components/errors";

interface IProps {

}

/***********************************************
 *                MAIN METHOD                  *
 **********************************************/
const SearchProduct = ({ }: IProps) => {
  const handleSearchChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    // setTimeout(() => {
    //   console.log(event.target.value);
    // }, 2000);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    // console.log(event.code)

    if (event.code === 'Enter') {
      console.log("hello world")
    }
  }

  return (
    <Box sx={{}}>
      <TextField
        size="small"
        onChange={handleSearchChange}
        onKeyDown={handleKeyPress}
      />
    </Box>
  )
}

export default SearchProduct