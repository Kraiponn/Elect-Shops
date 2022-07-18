import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { GetServerSideProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";

// Material design
import {
  Container,
  Toolbar,
  Box,
  Typography,
  Grid,
  Rating,
  IconButton,
  Button,
  Avatar,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

// Services & Global state
import {
  useAppDispatch,
  useAppSelector,
} from "@/features/hooks/use-global-state";
import {
  increaseProductToCart,
  decreaseProductFromCart,
  increaseProductToCartWithSpecify,
} from "@/features/global-state/reducers/product";

import { ThaiCurrencyFormatWithBuildIn } from "@/features/services";
import { IInputCart, IProduct } from "@/features/types";
import { AxiosError } from "axios";

// Components
import DefautLayout from "@/components/shares/layouts/defaut-layout";
import TopBreadcrumbs from "@/components/product/breadcrumbs";
import ImagePreview from "@/components/product/image-preview";
import ProductDescription from "@/components/product/product-description";

import FacebookIcon from "@/assets/images/icons/icon-facebook.png";
import LineIcon from "@/assets/images/icons/icon-line.png";
import TwitterIcon from "@/assets/images/icons/icon-twitter.png";

// Type for method
interface IProps {
  product: IProduct;
}

/*********************************************************
 *                     MAIN METHOD                       *
 ********************************************************/
const Content = ({ product }: IProps) => {
  const router = useRouter();
  const [productQuantity, setProductQuantity] = useState<number>(1);
  const dispatch = useAppDispatch();
  const { quantity } = useAppSelector((state) => state.product);

  const increaseProduct = () => {
    setProductQuantity((prev) => prev + 1);
  };

  const decreaseProduct = () => {
    if (productQuantity <= 1) return;

    setProductQuantity((prev) => prev - 1);
  };

  const handleAddProductToCart = (product: IProduct) => {
    const input: IInputCart = {
      product,
      quantity: productQuantity,
    };

    dispatch(increaseProductToCartWithSpecify(input));
    router.push("/");
  };

  return (
    <Grid container sx={{ marginTop: "2rem" }}>
      <ImagePreview product={product} />

      <ProductDescription
        product={product}
        productQuantity={productQuantity}
        increaseProduct={increaseProduct}
        decreaseProduct={decreaseProduct}
        handleAddProductToCart={() => handleAddProductToCart(product)}
      />
    </Grid>
  );
};

export default Content;
