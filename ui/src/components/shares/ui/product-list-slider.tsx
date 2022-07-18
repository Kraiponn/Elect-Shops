import React from "react";

// Material design
import { Typography, Box } from "@mui/material";

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

interface IProps {
  title?: string;
  titleFontSize?: string;
  products: IProduct[];
}

/********************************************************
 *                     MAIN METHOD                      *
 *******************************************************/
const ProductListItem = ({ title, titleFontSize, products }: IProps) => {
  return (
    <Box sx={{ margin: "1rem" }}>
      {title && (
        <Typography
          sx={{
            my: 5,
            ml: titleFontSize ? "0rem" : "2rem",
            mb: 0,
            fontSize: titleFontSize ? titleFontSize : "2rem",
            fontFamily: titleFontSize ? "PromptRegular" : "PromptBold",
          }}
          component="h2"
        >
          {title}
        </Typography>
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
