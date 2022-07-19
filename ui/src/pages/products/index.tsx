import React, {useState} from "react";
import type { GetStaticProps } from "next";
import { useRouter } from "next/router";
import { AxiosError } from "axios";

// Material design
import { Box, TextField, Toolbar, useMediaQuery } from "@mui/material";

// Services & Global state
import {
  useAppDispatch,
  useAppSelector,
} from "@/features/hooks/use-global-state";
import { fetchProducts } from "@/features/global-state/reducers/product";
import { http, getHttpErrorObject } from "@/features/services";
import {
  IProduct,
  IProductResponse,
  IErorrResponseData,
} from "@/features/types";
import { dummyBanner } from "@/features/services/dummy-data";
import { hotNavigationData } from "@/components/home/home-dummy-data";

// Components
import DefautLayout from "@/components/shares/layouts/defaut-layout";
import BannerSlider from "@/components/home/banner-slider";
import Content from "@/components/home/content";
import HotNavigation from "@/components/home/hot-navigation";
import ErrorShow from "@/components/errors";
import MyDialog from "@/components/shares/loader/my-dialog";

/***********************************************
 *               MAIN METHOD
 **********************************************/
const ProductPage = () => {
  const router = useRouter();
  const matches = useMediaQuery("(min-width:845px)");
  const [value, setValue] = useState<string>("");
  const { isLoading, isSuccess, isError } = useAppSelector(
    (state) => state.product
  );

  const handleRefreshPage = () => {
    router.reload();
  };

  const handleToggleLoadingState = () => {
    //
  };

  const handleSearchChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setValue(event.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === "Enter") {
      // console.log("Search key:", value);
      // dispatch(fetchProducts(value));
      router.push({
        pathname: "/[search]",
        query: { search: "search", keyword: value },
      });
    }
  };

  return (
    <DefautLayout title="home" description="welcome to shoping">
      <MyDialog
        type="LOADING"
        isShow={isLoading}
        toggleDialogState={handleToggleLoadingState}
      />
      <Toolbar />

      <TextField 
        value={value}
        onChange={handleSearchChange}
        onKeyDown={handleKeyPress}
      />
      <h1>Product page</h1>
    </DefautLayout>
  );
};

export default ProductPage;
