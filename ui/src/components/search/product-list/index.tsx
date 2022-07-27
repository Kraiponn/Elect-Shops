import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useRouter } from "next/router";
import Image from "next/image";

// Global state
import {
  useAppSelector,
  useAppDispatch,
} from "@/features/hooks/use-global-state";
import product, {
  increaseProductToCart,
  fetchProductsWithFilter,
} from "@/features/global-state/reducers/product";
import { IInputFilterProduct, IProduct } from "@/features/types";
import { clPrimary, clSecondary } from "@/features/const/colors";
import { ThaiCurrencyFormatWithBuildIn } from "@/features/services";

// Components
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  IconButton,
  Pagination,
  PaginationItem,
  Radio,
  RadioGroup,
  Rating,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FilterListIcon from "@mui/icons-material/FilterList";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";

import TopPagination from "@/components/search/product-list/top-navigation";
import ProductItem from "@/components/search/product-list/product-item";
import BottomPagination from "@/components/search/product-list/bottom-navigation";
import ProductNotFoundLogo from "@/assets/images/product-not-found.png";
import LoadingImage from "@/assets/images/loading.gif";

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
