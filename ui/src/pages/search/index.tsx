import React, { useEffect } from "react";
import { GetServerSideProps } from "next";
import { requireAuthentication } from "@/features/services/secure/require-auth";

// Global state
import { useAppDispatch } from "@/features/hooks/use-global-state";
import { clearStateWithoutProducts } from "@/features/global-state/reducers/product";
import { getCategories } from "@/features/global-state/reducers/category";

// Components
import { Toolbar } from "@mui/material";
import DefautLayout from "@/components/shares/layouts/defaut-layout";
import Content from "@/components/search/content";

/***********************************************************************************
 *                                MAIN FUNCTION                                    *
 **********************************************************************************/
const SearchPage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCategories());

    return () => {
      dispatch(clearStateWithoutProducts());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <DefautLayout title="content" description="product search">
      <Toolbar />

      <Content />
    </DefautLayout>
  );
};

/***********************************************************************************
 *                                MAIN FUNCTION                                    *
 **********************************************************************************/
export const getServerSideProps: GetServerSideProps = requireAuthentication(
  async (ctx) => {
    return {
      props: {},
    };
  }
);

export default SearchPage;
