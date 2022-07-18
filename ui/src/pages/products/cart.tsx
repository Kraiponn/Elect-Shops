// Material design
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { getHttpErrorObject, http } from "@/features/services";
import { AxiosError } from "axios";
import {
  IErorrResponseData,
  IProduct,
  IProductResponse,
} from "@/features/types";

import { Toolbar } from "@mui/material";

// Components
import DefautLayout from "@/components/shares/layouts/defaut-layout";
import Content from "@/components/cart/content";
import ErrorShow from "@/components/errors";

interface IProps {
  products: IProduct[];
  errObj?: IErorrResponseData;
}

/***********************************************
 *                MAIN METHOD                  *
 **********************************************/
const Cart = ({ products, errObj }: IProps) => {
  const router = useRouter();

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

      <Content products={products} />
    </DefautLayout>
  );
};

/******************************************************************
 *                      SERVER SIDE PART                          *
 *****************************************************************/
export const getServerSideProps: GetServerSideProps = async () => {
  const controller = new AbortController();

  try {
    const productsData = await http.get(
      `/products?page=1&limit=12&categoryId=6`,
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
