import React from "react";
import Image from "next/image";

// Material design
import { Box } from "@mui/material";

// Styles
import Slider from "react-slick";
// import styled from "@/assets/styles/banner-slider.module.css";

// Types
import { IProduct } from "@/features/types";
import { IDummyData } from "@/features/services";

// Components
import {
  NextButton,
  PreviousButton,
} from "@/components/home/custom-arrow-slider";

interface IProps {
  products?: IProduct[];
  dummyBanner?: IDummyData[];
}

/***********************************************
 *                MAIN METHOD                  *
 **********************************************/
const BannerSlider = ({ products, dummyBanner }: IProps) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <div style={{ width: "100%" }}>
        <Slider
          className="banner-slider"
          autoplay={true}
          slidesToShow={1}
          slidesToScroll={1}
          autoplaySpeed={2000}
          infinite={true}
          pauseOnHover
          nextArrow={<NextButton />}
          prevArrow={<PreviousButton />}
          dots
        >
          {dummyBanner?.map((banner) => (
            <Box
              key={banner.id}
              sx={{
                width: "100%",
                height: "45vh",
                position: "relative",
                "& :hover": {
                  cursor: "pointer",
                },
              }}
            >
              <Image
                src={banner.image}
                alt={banner.product_name}
                layout="fill"
                objectFit="fill"
                priority={true}
              />
            </Box>
          ))}
        </Slider>
      </div>
    </Box>
  );
};

export default BannerSlider;
