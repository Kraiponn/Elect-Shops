import React from "react";
import { useRouter } from "next/router";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";

import { http } from "@/features/services";
import { IProduct, IProductResponse } from "@/features/types";
import { ParsedUrlQuery } from "querystring";

// Type for method
interface IProps {
  product: IProduct;
}

interface IParams extends ParsedUrlQuery {
  productId: string;
}

/***********************************************
 *                MAIN METHOD                  *
 **********************************************/
const ProductDetail: NextPage<IProps> = ({ product }) => {
  const router = useRouter();
  // console.log("Client", product);

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return <div>ProductDetail</div>;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await http.get(`/products?page=1&limit=20`);
  const { products } = data as IProductResponse;

  const paths = products.map((product) => {
    return {
      params: { productId: String(product.id) },
    };
  });

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { data } = await http.get(`/products?page=1&limit=20`);
  const { products } = data as IProductResponse;

  //   console.log("products", params);
  const { productId } = params as IParams;
  const product = products.find((product) => product.id === Number(productId));

  return {
    props: {
      product,
    },
  };
};

export default ProductDetail;
