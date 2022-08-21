import React from "react";
import { GetServerSideProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";

// Material design
import { Toolbar, Box } from "@mui/material";

import { getHttpErrorObject, http } from "@/features/services";
import { IProduct } from "@/features/interfaces";
import { AxiosError } from "axios";

// Components
import DefautLayout from "@/components/shares/layouts/defaut-layout";
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
  return (
    <DefautLayout title="cart" description="product on your cart">
      <Toolbar />

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

// export const getStaticPaths: GetStaticPaths = async () => {
//   const { data } = await http.get(`/products?page=1&limit=20`);
//   const { products } = data as IProductResponse;

//   const paths = products.map((product) => {
//     return {
//       params: { productId: String(product.id) },
//     };
//   });

//   return {
//     paths,
//     fallback: true,
//   };
// };

// export const getStaticProps: GetStaticProps = async ({ params }) => {
//   const { data } = await http.get(`/products?page=1&limit=20`);
//   const { products } = data as IProductResponse;

//   //   console.log("products", params);
//   const { productId } = params as IParams;
//   const product = products.find((product) => product.id === Number(productId));

//   return {
//     props: {
//       product,
//     },
//   };
// };
