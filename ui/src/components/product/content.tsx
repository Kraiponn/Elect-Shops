import React, { useState } from "react";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";
import { ToastContainer, toast } from "react-toastify";

// Material design
import { Grid } from "@mui/material";

// Services & Global state
import { useAppDispatch } from "@/features/hooks/use-global-state";
import { increaseProductToCartWithSpecify } from "@/features/global-state/reducers/product";
import { IInputCart, IProduct } from "@/features/interfaces";

// Components
import ImagePreview from "@/components/product/image-preview";
import ProductDescription from "@/components/product/product-description";

interface IProps {
  product: IProduct;
}

/***********************************************************************************
 *                          ---  MAIN FUNCTION   ---                               *
 **********************************************************************************/
const Content = ({ product }: IProps) => {
  const router = useRouter();
  const { t } = useTranslation("product-detail");
  const [productQuantity, setProductQuantity] = useState<number>(1);
  const dispatch = useAppDispatch();

  const increaseProduct = () => {
    setProductQuantity((prev) => prev + 1);
  };

  const decreaseProduct = () => {
    if (productQuantity <= 1) return;

    setProductQuantity((prev) => prev - 1);
  };

  const onShowToastify = () => {
    toast.success("Product added is successfully", {
      // style: { background: "green", color: "white" },
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 1500,
      // icon: "🚀",
    });
  };

  const handleAddProductToCart = (product: IProduct) => {
    const input: IInputCart = {
      product,
      quantity: productQuantity,
    };

    dispatch(increaseProductToCartWithSpecify(input));
    onShowToastify();
  };

  const handleOnBuyProduct = () => {
    router.push("/products/cart", "/products/cart", {
      locale: router.locale,
    });
  };

  return (
    <>
      <ToastContainer />

      <Grid container>
        <ImagePreview favoriteLabel={t("favorite")} product={product} />

        <ProductDescription
          product={product}
          productQuantity={productQuantity}
          increaseProduct={increaseProduct}
          decreaseProduct={decreaseProduct}
          handleAddProductToCart={() => handleAddProductToCart(product)}
          handleOnBuyProduct={handleOnBuyProduct}
        />
      </Grid>
    </>
  );
};

export default Content;
