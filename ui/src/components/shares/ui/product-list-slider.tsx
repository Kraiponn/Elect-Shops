import React from "react";

// Material design
import { Typography, Box } from "@mui/material";
import EastIcon from "@mui/icons-material/East";
import ShopIcon from "@mui/icons-material/Shop";

// Styles
import Slider from "react-slick";

// Types
import { IProduct } from "@/features/types";

// Components
import {
  NextButton,
  PreviousButton,
} from "@/components/home/custom-arrow-slider";
import CardItem from "@/components/shares/ui/card-item";
import { clSecondary } from "@/features/const/colors";

interface IProps {
  title?: string;
  titleFontSize?: string;
  products: IProduct[];
}

/***********************************************************************************
 *                        -----   MAIN FUNCTION   -----                            *
 **********************************************************************************/
const ProductListItem = ({ title, titleFontSize, products }: IProps) => {
  return (
    <Box
      sx={{
        margin: "1rem",
        padding: "1rem 0.5rem",
        my: "5rem",
        boxShadow: "0 0 .5rem rgba(0, 0, 0, 0.252)",
        borderRadius: "0.5rem",
      }}
    >
      {/*****************   Product Title  *****************/}
      {title && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            ml: titleFontSize ? "1rem" : "2rem",
            mb: 0,
          }}
        >
          {/*****************   Title  *****************/}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <ShopIcon sx={{ fontSize: titleFontSize ? "2rem" : "2.7rem" }} />
            <Typography
              sx={{
                fontSize: titleFontSize ? titleFontSize : "2.5rem",
                fontFamily: "Prompt",
                fontWeight: titleFontSize ? 400 : 900,
                ml: 1,
              }}
              component="h2"
            >
              {title}
            </Typography>
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          {/*****************   More Product Menu   *****************/}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mr: 2,
              "&:hover": {
                transform: "scale(1.1)",
                cursor: "pointer",
              },
            }}
          >
            <Typography
              sx={{
                fontFamily: "Prompt",
                fontSize: "1.3rem",
                fontWeight: 900,
                color: clSecondary,
                ml: 3,
              }}
              component="h5"
            >
              {`More`}
            </Typography>
            <EastIcon sx={{ fontSize: "1.3rem", ml: 1, color: clSecondary }} />
          </Box>
        </Box>
      )}

      <Slider
        className="product-content"
        slidesToShow={5}
        slidesToScroll={1}
        nextArrow={<NextButton />}
        prevArrow={<PreviousButton />}
        //   centerMode
        //   centerPadding="200px"
        responsive={[
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 5,
              centerMode: false,
            },
          },
          {
            breakpoint: 950,
            settings: {
              slidesToShow: 4,
              centerMode: false,
            },
          },
          {
            breakpoint: 800,
            settings: {
              slidesToShow: 3,
              centerMode: false,
            },
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              centerMode: false,
            },
          },
          {
            breakpoint: 450,
            settings: {
              slidesToShow: 1,
              centerMode: false,
            },
          },
        ]}
      >
        {products.map((product) => {
          return <CardItem key={product.id} product={product} />;
        })}
      </Slider>
    </Box>
  );
};

export default ProductListItem;
