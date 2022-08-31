import React, { useEffect } from "react";
import { GetServerSideProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import { ToastContainer, toast } from "react-toastify";
import Cookies from "js-cookie";

// Material design
import { Toolbar, Box } from "@mui/material";

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
import { getHttpErrorObject, http } from "@/features/services";
import { IProduct } from "@/features/interfaces";
import { AxiosError } from "axios";

// Components
import MyDialog from "@/components/shares/loader/my-dialog";
import DefautLayout from "@/components/shares/layouts/default-layout";
import TopBreadcrumbs from "@/components/product/breadcrumbs";
import Content from "@/components/product/content";

// Type for method
interface IProps {
  product: IProduct;
}

interface IParams extends ParsedUrlQuery {
  productId: string;
}

/***********************************************************************************
 *                           MAIN FUNCTION - CLIENT SIDE                           *
 **********************************************************************************/
const ProductDetail: NextPage<IProps> = ({ product }) => {
  const dispatch = useAppDispatch();
  const { isLoading, isAddToCart } = useAppSelector((state) => state.product);
  const { access_token } = useAppSelector((state) => state.auth);

  const onShowToastify = () => {
    toast.success("Product added is successfully.", {
      autoClose: 1000,
      position: toast.POSITION.TOP_RIGHT,
      // style: { background: "green", color: "white" },
      // icon: "🚀",
    });
  };

  //############################################
  //             LIFE CYCLE METHOD
  //############################################
  useEffect(() => {
    if (!access_token) {
      const _accessToken = Cookies.get("access_token");

      if (_accessToken) {
        dispatch(fetchProfileById());
      }
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
    <DefautLayout title="cart" description="product on your cart">
      <Toolbar />
      <ToastContainer />
      <MyDialog
        type="LOADING"
        isShow={isLoading}
        toggleDialogState={() => {}}
      />

      <Box
        sx={{
          width: "100%",
          minHeight: "100vh",
          padding: "0.5rem 2.5rem 2rem 2.5rem",
        }}
      >
        <TopBreadcrumbs currentBreadcrumb={product.product_name} />
        <Content product={product} />
      </Box>
    </DefautLayout>
  );
};

/******************************************************************
 *                      SERVER SIDE PART                          *
 *****************************************************************/
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const controller = new AbortController();
  const { productId } = params as IParams;

  try {
    const productsData = await http.get(`/products/${productId}`, {
      signal: controller.signal,
    });

    const product = productsData.data;
    controller.abort();

    return {
      props: {
        product,
      },
    };
  } catch (error) {
    const errResponse = getHttpErrorObject(error as AxiosError);

    return {
      props: {
        product: {},
        errObj: errResponse,
      },
    };
  }
};

export default ProductDetail;
