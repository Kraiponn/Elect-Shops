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
  minPrice: number;
  maxPrice: number;
  handleSubmitFilterProduct: (e: FormEvent<HTMLFormElement>) => void;
  handleInputMinMaxPriceChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

/***********************************************
 *               MAIN METHOD
 **********************************************/
export default function FilterProduct({
  minPrice,
  maxPrice,
  handleSubmitFilterProduct,
  handleInputMinMaxPriceChange,
}: IProps) {
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
        }}
      >
        {/************* Price Range(Min, Max) *************/}
        <Typography
          variant="h5"
          sx={{
            color: "rgb(131, 124, 124)",
            marginBottom: "1rem",
          }}
        >{`Price Range`}</Typography>
        <form onSubmit={handleSubmitFilterProduct}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
            }}
          >
            <Stack
              direction="row"
              divider={<Divider orientation="vertical" flexItem />}
              spacing={2}
            >
              <TextField
                type="number"
                size="small"
                placeholder="min"
                name="minPrice"
                value={minPrice}
                onChange={handleInputMinMaxPriceChange}
              />
              <TextField
                type="number"
                size="small"
                placeholder="max"
                name="maxPrice"
                value={maxPrice}
                onChange={handleInputMinMaxPriceChange}
              />
            </Stack>

            <Button sx={{ mt: 1 }} variant="contained" type="submit">
              APPLY
            </Button>
          </Box>
        </form>

        {/************* Divider *************/}
        <Box
          sx={{
            marginY: "1.5rem",
            width: "100%",
            height: 0,
            borderTop: "0.001rem solid rgba(167, 163, 163, 0.5)",
          }}
        ></Box>

        {/************* Ratings filter *************/}
        <Typography
          variant="h5"
          sx={{
            color: "rgb(131, 124, 124)",
            marginBottom: "0.789rem",
          }}
        >{`Ratings`}</Typography>

        <RadioGroup name="product-rating" defaultValue={4.5}>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <FormControlLabel
              sx={{ margin: 0, padding: 0 }}
              value={4.5}
              control={<Radio sx={{ margin: "5px", padding: 0 }} />}
              label=""
            />
            <Rating
              sx={{ marginLeft: "0", marginRight: "0.25rem" }}
              value={4.5}
              precision={0.5}
            />
            <Typography variant="body1">4.5 & Up</Typography>
          </Box>

          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <FormControlLabel
              sx={{ margin: 0, padding: 0 }}
              value={4}
              control={<Radio sx={{ margin: "5px", padding: 0 }} />}
              label=""
            />
            <Rating
              sx={{ marginLeft: "0", marginRight: "0.25rem" }}
              value={4}
              precision={0.5}
            />
            <Typography variant="body1">4 & Up</Typography>
          </Box>

          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <FormControlLabel
              sx={{ margin: 0, padding: 0 }}
              value={3.5}
              control={<Radio sx={{ margin: "5px", padding: 0 }} />}
              label=""
            />
            <Rating
              sx={{ marginLeft: "0", marginRight: "0.25rem" }}
              value={3.5}
              precision={0.5}
            />
            <Typography variant="body1">3.5 & Up</Typography>
          </Box>

          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <FormControlLabel
              sx={{ margin: 0, padding: 0 }}
              value={3}
              control={<Radio sx={{ margin: "5px", padding: 0 }} />}
              label=""
            />
            <Rating
              sx={{ marginLeft: "0", marginRight: "0.25rem" }}
              value={3}
              precision={0.5}
            />
            <Typography variant="body1">3 & Up</Typography>
          </Box>
        </RadioGroup>
      </Box>
    </Grid>
  );
}
