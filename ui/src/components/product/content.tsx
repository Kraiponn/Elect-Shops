import React, { useState } from "react";
import { useRouter } from "next/router";

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
  const [productQuantity, setProductQuantity] = useState<number>(1);
  const dispatch = useAppDispatch();

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
    <Grid container>
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
