import React from "react";

// Material design
import { Box } from "@mui/material";

// Types
import { IProduct } from "@/features/types";
import ProductListSlider from "@/components/home/product-list-slider";
import PromotionsContent from "@/components/home/promotion-content";

interface IProps {
  electrics: IProduct[];
  books: IProduct[];
}

/***********************************************
 *                MAIN METHOD                  *
 **********************************************/
export default function Content({ electrics, books }: IProps) {
  return (
    <Box>
      <ProductListSlider title="New arrival" products={electrics} />
      <ProductListSlider title="Popular" products={books} />

      <PromotionsContent />
    </Box>
  );
}
