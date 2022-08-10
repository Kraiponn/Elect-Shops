import React, { ChangeEvent } from "react";

// Global state
import { IProduct } from "@/features/interfaces";

// Components
import { Grid, Typography } from "@mui/material";
import TopPagination from "@/components/search/product-list/top-navigation";
import ProductItem from "@/components/search/product-list/product-item";
import BottomPagination from "@/components/search/product-list/bottom-navigation";

interface IProps {
  products: IProduct[];
  total: number;
  currentPage: number;
  favorite: boolean;
  handleToggleProductFavorite: () => void;
  handlePaginationChange: (e: ChangeEvent<unknown>, page: number) => void;
  handleIncreaseProductToCart: (product: IProduct) => void;
  handleNavigateToProductDetail: (product: IProduct) => void;
}

/***********************************************************************************
 *                         -----   MAIN FUNCTION   -----                           *
 **********************************************************************************/
export default function ProductList({
  products,
  total,
  currentPage,
  favorite,
  handleToggleProductFavorite,
  handlePaginationChange,
  handleIncreaseProductToCart,
  handleNavigateToProductDetail,
}: IProps) {
  return (
    <Grid item xs={12} md={12} lg={9}>
      <Typography
        variant="h6"
        sx={{ textAlign: "right" }}
      >{`${total} results`}</Typography>

      {/************* Top Pagination *************/}
      <TopPagination
        total={total}
        currentPage={currentPage}
        handlePaginationChange={handlePaginationChange}
      />

      <ProductItem
        products={products}
        favorite={favorite}
        handleIncreaseProductToCart={handleIncreaseProductToCart}
        handleNavigateToProductDetail={handleNavigateToProductDetail}
        handleToggleProductFavorite={handleToggleProductFavorite}
      />

      {/************* Bottom Pagination *************/}
      <BottomPagination
        total={total}
        currentPage={currentPage}
        handlePaginationChange={handlePaginationChange}
      />
    </Grid>
  );
}
