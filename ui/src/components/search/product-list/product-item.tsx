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
import BottomPagination from "@/components/search/product-list/bottom-navigation";
import ProductItemHover from "@/components/search/product-list/product-item-hover";
import ProductNotFoundLogo from "@/assets/images/product-not-found.png";
import LoadingImage from "@/assets/images/loading.gif";

interface IProps {
  products: IProduct[];
  favorite: boolean;
  handleToggleProductFavorite: () => void;
  handleIncreaseProductToCart: (product: IProduct) => void;
  handleNavigateToProductDetail: (product: IProduct) => void;
}

/***********************************************
 *               MAIN METHOD
 **********************************************/
export default function ProductItem({
  products,
  favorite,
  handleToggleProductFavorite,
  handleIncreaseProductToCart,
  handleNavigateToProductDetail,
}: IProps) {
  return (
    <>
      {products.map((product) => (
        <Box
          className="card-container"
          key={product.id}
          sx={{
            borderBottom: "0.01rem solid rgba(226, 221, 221, 0.975)",
            padding: "1rem",
            width: "100%",
            minWidth: "390px",
            height: "12rem",
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            position: "relative",
            "&:hover": {
              ".card-container_hover": {
                transform: "scale(1)",
                visibility: "visible",
                opacity: 1,
              },
            },
          }}
        >
          {/* Dialog card show when hover */}
          <ProductItemHover
            product={product}
            product_name={product.product_name}
            unit_price={product.unit_price}
            description={product.description}
            favorite={favorite}
            handleIncreaseProductToCart={handleIncreaseProductToCart}
            handleToggleProductFavorite={handleToggleProductFavorite}
          />

          {/* Image  */}
          <Box
            className="card-image"
            onClick={() => handleNavigateToProductDetail(product)}
            sx={{
              position: "relative",
              width: { xs: "100px", sm: "150px", md: "220px" },
              height: { xs: "5rem", md: "7rem", lg: "10rem" },
              // height: "10rem",
              transition: "all 0.7s ease",
              "&:hover": {
                cursor: "pointer",
                transform: "scale(1.1)",
              },
            }}
          >
            <Image
              src={product.image_url}
              loading="lazy"
              alt={product.product_name}
              layout="fill"
              objectFit="fill"
            />
          </Box>

          {/* Product title and description */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "flex-start",
              height: "12rem",
              width: "50%",
              position: "relative",
              marginLeft: "1rem",
              paddingY: "0.5rem",
            }}
          >
            <Box>
              <Typography variant="h5">{product.product_name}</Typography>

              <Typography className="multine-ellipsis_2" variant="body1">
                {product.description}
              </Typography>
            </Box>

            <Box>
              <Rating defaultValue={5} precision={0.5} />
              <Typography variant="body1">{`${product.in_stock} pcs`}</Typography>
            </Box>
          </Box>

          {/***********  Product price ***********/}
          <Box
            sx={{
              flexGrow: 1,
              // width: "20%",
              height: "12rem",
              paddingTop: "2rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "flex-end",
              color: "red",
            }}
          >
            <Typography variant="h6">
              {ThaiCurrencyFormatWithBuildIn(product.unit_price)}
            </Typography>
          </Box>
        </Box>
      ))}
    </>
  );
}
