import React, { ChangeEvent } from "react";

// Global state
import { IProduct } from "@/features/types";

// Components
import {
  Grid,
} from "@mui/material";
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

/***********************************************
 *               MAIN METHOD
 **********************************************/
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
