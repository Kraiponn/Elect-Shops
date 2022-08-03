import { useRouter } from "next/router";

// Material design
import { Grid } from "@mui/material";

// Services & Global state
import { useAppDispatch } from "@/features/hooks/use-global-state";
import { IProduct, IOrderProduct } from "@/features/types";
import {
  increaseProductToCart,
  decreaseProductFromCart,
  removeProductFromCart,
} from "@/features/global-state/reducers/product";

// Components
import CartListItem from "@/components/cart/cart-list-item";
import CartSummay from "@/components/cart/cart-summary";

interface IProps {
  orders: IOrderProduct[];
  quantity: number;
  totalPrice: number;
}

/***********************************************************************************
 *                          ---  MAIN FUNCTION   ---                               *
 **********************************************************************************/
const ProductCart = ({ orders, quantity, totalPrice }: IProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleIncreaseProductToCart = (product: IProduct) => {
    dispatch(increaseProductToCart(product));
  };

  const handleDecreaseProductFromCart = (product: IProduct) => {
    dispatch(decreaseProductFromCart(product));
  };

  const handleRemoveProductFromCart = (product: IProduct) => {
    dispatch(removeProductFromCart(product));
  };

  const handleShopingMoreProduct = () => {
    router.push("/");
  };

  return (
    <Grid container sx={{ width: "100%" }}>
      <CartListItem
        orders={orders}
        increaseProductToCart={handleIncreaseProductToCart}
        decreaseProductFromCart={handleDecreaseProductFromCart}
        removeProductFromCart={handleRemoveProductFromCart}
      />

      <CartSummay
        quantity={quantity}
        totalPrice={totalPrice}
        handleShopingMoreProduct={handleShopingMoreProduct}
      />
    </Grid>
  );
};

export default ProductCart;
