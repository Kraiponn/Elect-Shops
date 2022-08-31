import React, { useEffect } from "react";
import { GetServerSideProps } from "next";
import { requireAuthentication } from "@/features/services/secure/require-auth";
import { ToastContainer, toast } from "react-toastify";
import Cookies from "js-cookie";

// Global state
import {
  useAppDispatch,
  useAppSelector,
} from "@/features/hooks/use-global-state";
import {
  clearStateWithoutProducts,
  clearStateAddToCart,
} from "@/features/global-state/reducers/product";
import { fetchProfileById } from "@/features/global-state/reducers/auth";

// Components
import { Toolbar } from "@mui/material";
import MyDialog from "@/components/shares/loader/my-dialog";
import DefautLayout from "@/components/shares/layouts/default-layout";
import Content from "@/components/search/content";

/***********************************************************************************
 *                                MAIN FUNCTION                                    *
 **********************************************************************************/
const SearchPage = () => {
  const dispatch = useAppDispatch();
  const { isLoading, isAddToCart } = useAppSelector((state) => state.product);
  const { access_token } = useAppSelector((state) => state.auth);

  const onShowToastify = () => {
    toast.success("Product added is successfully.", {
      autoClose: 1000,
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  //############################################
  //             LIFE CYCLE METHOD
  //############################################
  useEffect(() => {
    if (!access_token) {
      const _accessToken = Cookies.get("access_token");

      if (_accessToken) dispatch(fetchProfileById());
    }

    if (isAddToCart) {
      onShowToastify();
      dispatch(clearStateAddToCart());
    }

    return () => {
      dispatch(clearStateWithoutProducts());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAddToCart]);

  return (
    <DefautLayout title="content" description="product search">
      <Toolbar />
      <ToastContainer />
      <MyDialog
        type="LOADING"
        isShow={isLoading}
        toggleDialogState={() => {}}
      />

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
