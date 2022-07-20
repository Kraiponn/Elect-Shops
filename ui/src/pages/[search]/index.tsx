import React, { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

// Global state
import {
  useAppSelector,
  useAppDispatch,
} from "@/features/hooks/use-global-state";
import {
  fetchProducts,
  clearProductState,
} from "@/features/global-state/reducers/product";
import { setAuthSuccess } from "@/features/global-state/reducers/auth";
import { ParsedUrlQuery } from "querystring";

// Components
import Footer from "@/components/shares/footer";
import TopNavigation from "@/components/shares/navigates/top-navigation";
import DefautLayout from "@/components/shares/layouts/defaut-layout";
import { Box, Toolbar } from "@mui/material";

interface IParseQuery extends ParsedUrlQuery {
  keyword: string;
}

/****************************************************
 *                  MAIN FUNCTION
 ***************************************************/
const Keyword = () => {
  const { query } = useRouter();
  const dispatch = useAppDispatch();
  const { isLoading, isSuccess, isError, products } = useAppSelector(
    (state) => state.product
  );

  const { keyword } = query as IParseQuery;

  console.log("Keyword: ", query);

  if (!isLoading && isSuccess && products) {
    // setTimeout(() => {
    //   dispatch(fetchProducts(keyword));
    // }, 1000);
    // console.log("run...");
  }

  useEffect(() => {
    // let isSet = true;
    // if (isSet) {
    //   console.log('Hello keyword..')
    // }

    return () => {
      // isSet = false;
      console.log("Unmounting..");
      dispatch(clearProductState());
    };
  }, [dispatch]);

  return (
    <DefautLayout title="home" description="welcome to shoping">
      {/* <TopNavigation /> */}

      <Toolbar />
      <h1>keyword</h1>
    </DefautLayout>
  );
};

export default Keyword;
