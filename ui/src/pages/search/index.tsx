import React, { useEffect } from "react";
import { useRouter } from "next/router";

// Global state
import {
  useAppSelector,
  useAppDispatch,
} from "@/features/hooks/use-global-state";
import {
  fetchProducts,
  clearProductState,
  clearStateWithoutProducts,
} from "@/features/global-state/reducers/product";
import { ParsedUrlQuery } from "querystring";

// Components
import { Box, Container, Toolbar, Typography } from "@mui/material";
import Footer from "@/components/shares/footer";
import DefautLayout from "@/components/shares/layouts/defaut-layout";
import Content from '@/components/search/content'

interface IParseQuery extends ParsedUrlQuery {
  keyword: string;
}

/***********************************************
 *               MAIN METHOD
 **********************************************/
const SearchPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch()
  const { isLoading, isSuccess, isError, products, keyword: searchKey } = useAppSelector(
    (state) => state.product
  );

  const handleToggleLoadingState = () => {
    //
  };

  useEffect(() => {
    return () => {
      console.log("Search page unmounting..");
      dispatch(clearStateWithoutProducts());
    };
  })

  if (!isLoading && isSuccess && products.length > 0) {
    // query.keyword = keyword;
    router.push({
      pathname: "/search",
      query: {
        keyword: searchKey,
      },
    });
  }

  return (
    <DefautLayout title="search product" description="welcome to shoping">
      <Toolbar />

      <Content products={products} keyword={searchKey} />
    </DefautLayout>
  );
};

export default SearchPage;
