import React, { useEffect } from "react";
import { useRouter } from "next/router";

// Global state
import {
  useAppSelector,
  useAppDispatch,
} from "@/features/hooks/use-global-state";
import { clearStateWithoutProducts } from "@/features/global-state/reducers/product";
// import { ParsedUrlQuery } from "querystring";

// Components
import { Toolbar } from "@mui/material";
import DefautLayout from "@/components/shares/layouts/defaut-layout";
import Content from "@/components/search/content";

/***********************************************************************************
 *                                MAIN FUNCTION                                    *
 **********************************************************************************/
const SearchPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const {
    isLoading,
    isSuccess,
    pagination,
    keyword: searchKey,
  } = useAppSelector((state) => state.product);

  useEffect(() => {
    return () => {
      // console.log("Search page unmounting..");
      dispatch(clearStateWithoutProducts());
    };
  });

  if (!isLoading && isSuccess && pagination.products.length > 0) {
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

      <Content />
    </DefautLayout>
  );
};

export default SearchPage;
