import type { GetStaticProps, NextPage } from "next";
import Image from "next/image";

// Material design
import { Typography, Box } from "@mui/material";

import Cookies from "js-cookie";
import Slider from "react-slick";
import { Carousel } from "react-responsive-carousel";
import styled from "@/assets/styles/Home.module.css";

// Global state
import {
  useAppSelector,
  useAppDispatch,
} from "@/features/hooks/use-global-state";
import product, {
  addProductToCart,
  removeProductFromCart,
} from "@/features/global-state/reducers/product";
import { http } from "@/features/services/http";

// Components
import DefautLayout from "@/components/shares/layouts/defaut-layout";
import { cmlProducts } from "@/features/services/dummy-data";
import { clSecondaryGrayBlackDark } from "@/features/const/colors";
import { IProduct, IProductResponse } from "@/features/types";
import BannerSlider from "@/components/home/banner-slider";

interface IProps {
  products: IProduct[];
}

/***********************************************
 *                MAIN METHOD                  *
 **********************************************/
const Home = ({ products }: IProps) => {
  // const dispatch = useAppDispatch();
  // const { products, totalPrice, amount } = useAppSelector(
  //   (state) => state.product
  // );

  // console.log("From client:", products);

  return (
    <DefautLayout title="home" description="welcome to shoping">
      {products ? <BannerSlider products={products} /> : <div></div>}

      <Box sx={{}}>Welcome to code maker lab</Box>
    </DefautLayout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const response = await http.get(`/products?page=1&limit=12`);
  // console.log("Response", response.data);

  const productResponse: IProductResponse = response.data;

  return {
    props: {
      products: productResponse.products,
    },
  };
};

export default Home;
