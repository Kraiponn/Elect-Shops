import React, { ChangeEvent, FormEvent } from "react";
import useTranslation from "next-translate/useTranslation";

// Components
import { Box, Grid } from "@mui/material";

// Global state and Types
import { useAppSelector } from "@/features/hooks/use-global-state";

// Components
import ProductCategoryList from "@/components/search/product-list/product-category-list";
import RatingFilter from "@/components/search/filter/rating-filter";
import PriceRangeFilter from "@/components/search/filter/price-range-filter";

interface IProps {
  minPrice: number;
  maxPrice: number;
  categoryId: number;
  handleSubmitFilterProduct: (e: FormEvent<HTMLFormElement>) => void;
  handleInputMinMaxPriceChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleOnChangeProductCategory: (e: ChangeEvent<HTMLSelectElement>) => void;
}

/***********************************************************************************
 *                         -----   MAIN FUNCTION   -----                           *
 **********************************************************************************/
export default function FilterProduct({
  minPrice,
  maxPrice,
  categoryId,
  handleSubmitFilterProduct,
  handleInputMinMaxPriceChange,
  handleOnChangeProductCategory,
}: IProps) {
  const { t } = useTranslation("search");
  const { darkMode } = useAppSelector((state) => state.gui);

  return (
    <Grid item xs={12} md={12} lg={3}>
      <Box
        sx={{
          width: "100%",
          padding: "1rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          color: "rgb(131, 124, 124)",
        }}
      >
        {/************* Product Categories *************/}
        <ProductCategoryList
          darkMode={darkMode}
          categoryId={categoryId}
          title={t("filterResult.category")}
          handleOnChangeProductCategory={handleOnChangeProductCategory}
        />

        <Box
          sx={{
            width: "100%",
            height: "0",
            marginX: "auto",
            mt: "2rem",
            mb: "1rem",
            // background: darkMode ? clWhiteGray : clDarkLight,
            borderBottom: darkMode
              ? "2px solid rgba(255, 255, 255, 0.103)"
              : "2px solid rgba(1, 1, 1, 0.103)",
          }}
        />

        {/************* Price Range(Min, Max) *************/}
        <PriceRangeFilter
          darkMode={darkMode}
          minPrice={minPrice}
          maxPrice={maxPrice}
          handleInputMinMaxPriceChange={handleInputMinMaxPriceChange}
          handleSubmitFilterProduct={handleSubmitFilterProduct}
        />

        {/************* Ratings filter *************/}
        <RatingFilter darkMode={darkMode} />
      </Box>
    </Grid>
  );
}
