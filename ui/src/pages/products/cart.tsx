import { useEffect } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

// Global service and Types
import { getHttpErrorObject, http } from "@/features/services";
import { AxiosError } from "axios";
import {
  IErorrResponseData,
  IProduct,
  IProductResponse,
} from "@/features/interfaces";

// Global state and Global types
import {
  useAppDispatch,
  useAppSelector,
} from "@/features/hooks/use-global-state";
import { clearStateWithoutProducts } from "@/features/global-state/reducers/product";

// Material design
import { Toolbar } from "@mui/material";

// Components
import DefautLayout from "@/components/shares/layouts/defaut-layout";
import Content from "@/components/cart/content";
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
  const {
    isLoading,
    isSuccess,
    pagination,
    keyword: searchKey,
  } = useAppSelector((state) => state.product);

  useEffect(() => {
    // console.log("Hello home page");

    return () => {
      // console.log("Home page unmount..");
      dispatch(clearStateWithoutProducts());
    };
  }, [dispatch]);

  const handleRefreshPage = () => {
    router.reload();
  };

  if (errObj) {
    return (
      <ErrorShow errorObject={errObj} handleRefreshPage={handleRefreshPage} />
    );
  }

  if (!isLoading && isSuccess && pagination.products.length > 0) {
    router.push({
      pathname: "/search",
      query: {
        keyword: searchKey,
      },
    });
  }

  return (
    <DefautLayout title="Cart" description="product on your cart">
      <Toolbar />

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
    // console.log("Response", products);
    controller.abort();

    return {
      props: {
        products,
      },
    };
  } catch (error) {
    // console.log("My error", error as AxiosError);
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
