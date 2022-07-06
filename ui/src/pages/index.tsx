import type { GetStaticProps, NextPage } from "next";
import Image from "next/image";

// Material design
import { Typography, Box } from "@mui/material";

import Slider from "react-slick";
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

const settings = {
  className: "",
  dots: true,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  adaptiveHeight: true,
  autoplay: true,
  autoplaySpeed: 2000,
  pauseOnHover: true
};

/***********************************************
 *                MAIN METHOD                  *
 **********************************************/
const Home: NextPage = () => {
  const dispatch = useAppDispatch();
  const { products, totalPrice, amount } = useAppSelector(
    (state) => state.product
  );

  return (
    <DefautLayout title="home">
      <Box sx={{
        width: "100%",
        height: "35vh",
      }}>
        <Slider {...settings}>
          {cmlProducts.map((p, index) => {
            return (
              <Box key={index} component="div"
                // sx={{
                //   width: "100%",
                //   height: "100%"
                // }}
              >
                <Box
                  sx={{ position: "relative", width: "100%", height: "50vh" }}
                >
                  <Image
                    className={styled['my-image']}
                    src={p.image_url}
                    alt={p.product_name}
                    layout="fill"
                    objectFit="contain"
                  />
                </Box>
              </Box>
            )
          })}
        </Slider>
      </Box>
    </DefautLayout>
  )
};

// export const getStaticProps: GetStaticProps = async () => {
//   return {
//     props: {},
//   };
// };

export default Home;