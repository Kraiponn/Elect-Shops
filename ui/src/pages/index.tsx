import type { GetStaticProps, NextPage } from "next";
import Image from "next/image";

// Material design
import { Typography, Box } from "@mui/material";

import Cookies from "js-cookie";
import { Carousel } from "react-responsive-carousel";
import styled from "@/assets/styles/Home.module.css";

// Global state
import {
  useAppSelector,
  useAppDispatch,
} from "@/features/hooks/use-global-state";
import {
  addProductToCart,
  removeProductFromCart,
} from "@/features/global-state/reducers/product";

// Components
import DefautLayout from "@/components/shares/layouts/defaut-layout";
import { cmlProducts } from "@/features/services/dummy-data";
import { clSecondaryGrayBlackDark } from "@/features/const/colors";

/***********************************************
 *                MAIN METHOD                  *
 **********************************************/
const Home: NextPage = () => {
  const dispatch = useAppDispatch();
  const { products, totalPrice, amount } = useAppSelector(
    (state) => state.product
  );

  return (
    <DefautLayout title="home" description="welcome to shoping">
      <Box
        className="home-container"
        sx={{
          position: "relative",
          width: "100%",
          height: "45vh",
          zIndex: "1499",
          marginTop: "56px",

          // background: clSecondaryGrayBlackDark,
        }}
      >
        <Carousel
          className={styled["carousel-container"]}
          autoPlay
          infiniteLoop
          showArrows={true}
          showIndicators={true}
          showStatus={true}
          // showThumbs={true}
        >
          {cmlProducts.map((product, index) => {
            return (
              <Box
                key={index}
                component="div"
                sx={{
                  // position: "absolute",
                  // top: 0,
                  // left: 0,
                  width: "100%",
                  height: "100%",
                }}
              >
                <Box
                  sx={{ position: "relative", width: "100%", height: "100vh" }}
                >
                  <Image
                    src={product.image_url}
                    alt="demo1"
                    layout="fill"
                    objectFit="contain"
                  />
                </Box>

                <Typography>{product.product_name}</Typography>
              </Box>
            );
          })}
        </Carousel>
      </Box>
    </DefautLayout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};

export default Home;
