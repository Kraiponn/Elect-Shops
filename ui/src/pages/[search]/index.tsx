import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

// Global state
import {
  useAppSelector,
  useAppDispatch,
} from "@/features/hooks/use-global-state";
import { fetchProducts } from "@/features/global-state/reducers/product";
import { setAuthSuccess } from "@/features/global-state/reducers/auth";

// Components
import TopNavigation from "@/components/shares/navigates/top-navigation";
import Footer from "@/components/shares/footer";
import { Box, Toolbar } from "@mui/material";

// Components
import DefautLayout from "@/components/shares/layouts/defaut-layout";

const Keyword = () => {
  const { query } = useRouter();
  const dispatch = useAppDispatch();
  const { isLoading, isSuccess, isError } = useAppSelector(
    (state) => state.product
  );

  console.log("Keyword: ", query);

  if (!isLoading && !isSuccess) {
    // dispatch(fetchProducts(query["keyword"]));
  }

  return (
    <DefautLayout title="home" description="welcome to shoping">
      <Toolbar />
      <h1>keyword</h1>
    </DefautLayout>
  );
};

export default Keyword;
