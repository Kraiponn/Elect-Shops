import React, { ChangeEvent } from "react";
import useTranslation from "next-translate/useTranslation";

// Global state
import { IProduct } from "@/features/interfaces";

// Components
import { Typography } from "@mui/material";
import TopPagination from "@/components/search/product-list/top-navigation";
import ProductItem from "@/components/search/product-list/product-item";
import BottomPagination from "@/components/search/product-list/bottom-navigation";
import ScreenSize from "@/components/search/product-list/screen-size";

interface IProps {
  products: IProduct[];
  total: number;
  currentPage: number;
  favorite: boolean;
  visibleFilter: boolean;
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
  visibleFilter,
  handleToggleProductFavorite,
  handlePaginationChange,
  handleIncreaseProductToCart,
  handleNavigateToProductDetail,
}: IProps) {
  const { t } = useTranslation("search");

  return (
    <ScreenSize visible={visibleFilter}>
      <>
        <Typography variant="h6" sx={{ textAlign: "right" }}>
          {t("productList.title", { quantity: total })}
        </Typography>

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
      </>
    </ScreenSize>
  );
}
