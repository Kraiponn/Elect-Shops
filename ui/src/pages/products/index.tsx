import React from "react";
import type { GetStaticProps } from "next";
import { useRouter } from "next/router";
import { AxiosError } from "axios";

// Material design
import { Box, Toolbar, useMediaQuery } from "@mui/material";

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
  const { isLoading, isSuccess, isError } = useAppSelector(
    (state) => state.product
  );

  const handleRefreshPage = () => {
    router.reload();
  };

  const handleToggleLoadingState = () => {
    //
  };

  return (
    <DefautLayout title="home" description="welcome to shoping">
      <MyDialog
        type="LOADING"
        isShow={isLoading}
        toggleDialogState={handleToggleLoadingState}
      />
      <Toolbar />

      

    </DefautLayout>
  );
};

export default ProductPage;
