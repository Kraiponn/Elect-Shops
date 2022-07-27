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

import ProductNotFoundLogo from "@/assets/images/product-not-found.png";
import LoadingImage from "@/assets/images/loading.gif";

/***********************************************
 *               MAIN METHOD
 **********************************************/
export default function ProductNotFound() {
  return (
    <Box
      sx={{
        width: "70%",
        minHeight: "100vh",
        margin: "3rem auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        border: "0.001rem solid rgba(182, 180, 180, 0.356)",
      }}
    >
      <Typography
        variant="h1"
        sx={{
          color: "rgb(251, 5, 5)",
        }}
      >{`!Oops`}</Typography>
      <Typography
        variant="h4"
        sx={{
          color: "#919090d2",
          marginY: "1rem",
        }}
      >{`Product Not Found`}</Typography>

      <Box sx={{ position: "relative", width: "35%", height: "13rem" }}>
        <Image
          src={ProductNotFoundLogo}
          alt="not found"
          layout="fill"
          objectFit="contain"
        />
      </Box>
    </Box>
  );
}
