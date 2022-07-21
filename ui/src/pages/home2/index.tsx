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

interface IParseQuery extends ParsedUrlQuery {
  keyword: string;
}

/****************************************************
 *                  MAIN FUNCTION
 ***************************************************/
const Keyword = () => {
  const { query, push } = useRouter();
  const dispatch = useAppDispatch();
  const { isLoading, isSuccess, isError, products, keyword } = useAppSelector(
    (state) => state.product
  );
  const { keyword: searchKey } = query as IParseQuery;

  console.log("Keyword: ", query);

  if (!isLoading && isSuccess && products.length > 0) {
    // query.keyword = keyword;
    push({
      pathname: "/search",
      query: {
        search: "search",
        keyword: 'hello',
      },
    });
  }

  useEffect(() => {

    return () => {
      console.log("Search page unmounting..");
      dispatch(clearStateWithoutProducts());
    };
  }, [dispatch]);

  return (
    <DefautLayout title="home" description="welcome to shoping">
      <Toolbar />
      <Container>
        <Typography>{`${products.length} Results for ${searchKey}`}</Typography>
      </Container>
    </DefautLayout>
  );
};

export default Keyword;
