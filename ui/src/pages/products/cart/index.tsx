import { useEffect } from "react";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { ToastContainer, toast } from "react-toastify";
import Cookies from "js-cookie";

// Global service and Types
import { getHttpErrorObject, http } from "@/features/services";
import { AxiosError } from "axios";
import {
  IErorrResponseData,
  IProduct,
  IProductResponse,
} from "@/features/interfaces";

// Global state and Types
import {
  useAppSelector,
  useAppDispatch,
} from "@/features/hooks/use-global-state";
import { fetchProfileById } from "@/features/global-state/reducers/auth";
import {
  clearStateAddToCart,
  clearStateWithoutProducts,
} from "@/features/global-state/reducers/product";

// Material design
import { Toolbar } from "@mui/material";

// Components
import MyDialog from "@/components/shares/loader/my-dialog";
import DefautLayout from "@/components/shares/layouts/default-layout";
import Content from "@/components/product/cart/content";
import ErrorShow from "@/components/errors";

interface IProps {
  products: IProduct[];
  errObj?: IErorrResponseData;
}

/***********************************************************************************
 *                   -----   MAIN FUNCTION - CLIENT SIDE   -----                   *
 **********************************************************************************/
const Cart = ({ products, errObj }: IProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { access_token } = useAppSelector((state) => state.auth);
  const { isAddToCart, isLoading } = useAppSelector((state) => state.product);

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

  const handleRefreshPage = () => {
    router.reload();
  };

  if (errObj) {
    return (
      <ErrorShow errorObject={errObj} handleRefreshPage={handleRefreshPage} />
    );
  }

  return (
    <DefautLayout title="Cart" description="product on your cart">
      <Toolbar />
      <ToastContainer />

      <MyDialog
        type="LOADING"
        isShow={isLoading}
        toggleDialogState={() => {}}
      />

      <Content products={products} />
    </DefautLayout>
  );
};

/***********************************************************************************
 *                       ---   SERVER SIDE PART   ---                              *
 **********************************************************************************/
export const getServerSideProps: GetServerSideProps = async () => {
  const controller = new AbortController();

  try {
    const productsData = await http.get(
      `/products?page=1&limit=12&categoryId=2`,
      { signal: controller.signal }
    );

    const products: IProductResponse = productsData.data.products;
    controller.abort();

    return {
      props: {
        products,
      },
    };
  } catch (error) {
    const errResponse = getHttpErrorObject(error as AxiosError);

    return {
      props: {
        products: [],
        errObj: errResponse,
      },
    };
  }
};

export default Cart;
