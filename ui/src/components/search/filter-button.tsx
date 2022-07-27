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

interface IProps {
  totalProduct: number;
  handleToggleShowFilterResule: () => void;
}

/***********************************************
 *               MAIN METHOD
 **********************************************/
export default function FilterButton({
  totalProduct,
  handleToggleShowFilterResule,
}: IProps) {
  return (
    <Box
      sx={{
        width: "100%",
        marginTop: "2.5rem",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <IconButton onClick={handleToggleShowFilterResule}>
        <FilterListIcon fontSize="large" />

        <Typography
          variant="h5"
          sx={{ marginLeft: "1rem" }}
        >{`Filter Results`}</Typography>
      </IconButton>

      <Typography variant="h6">{`${totalProduct} results`}</Typography>
    </Box>
  );
}
