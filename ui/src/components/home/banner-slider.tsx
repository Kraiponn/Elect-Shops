import React from "react";
import Image from "next/image";

// Material design
import { Typography, Box } from "@mui/material";

// Styles
import { Carousel } from "react-responsive-carousel";
import styled from "@/assets/styles/Home.module.css";

// Types
import { IProduct } from "@/features/types";

interface IProps {
  products: IProduct[];
}

/***********************************************
 *                MAIN METHOD                  *
 **********************************************/
const BannerSlider = ({ products }: IProps) => {
//   console.log("From client:", products);

  return (
    <Carousel
      className={styled["carousel-container"]}
      showThumbs={false}
      showArrows={true}
      showIndicators={true}
      showStatus={true}
      infiniteLoop={true}
      autoPlay={true}
      interval={3000}
      stopOnHover={true}
      onClickItem={(item: number) => {
        console.log("Click item no ", item);
      }}
    >
      {products.map((product) => {
        return (
          <Box
            key={product.id}
            sx={{
              background: "rgba(0, 0, 0, 1)",
              "&:hover": {
                cursor: "pointer",
              },
            }}
          >
            <div
              style={{ width: "100%", height: "45vh", position: "relative" }}
            >
              <Image
                src={product.image_url}
                alt={product.product_name}
                layout="fill"
                objectFit="contain"
              />
            </div>
            <p className={"legend"}>{product.product_name}</p>
          </Box>
        );
      })}
    </Carousel>
  );
};

export default BannerSlider;
