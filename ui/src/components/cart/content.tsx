// Material design
import { Box, Typography } from "@mui/material";

// Global types & Global state
import { useAppSelector } from "@/features/hooks/use-global-state";
import { IProduct } from "@/features/types";

// Components
import EmptyCart from "@/components/cart/empty-cart";
import ProductCart from "@/components/cart/product-cart";
import RecommendProduct from "./recommend-products";

interface IProps {
  products: IProduct[];
}

/***********************************************************************************
 *                          ---  MAIN FUNCTION   ---                               *
 **********************************************************************************/
const Content = ({ products }: IProps) => {
  const { orders, quantity, totalPrice } = useAppSelector(
    (state) => state.product
  );

  return (
    <Box
      className="cart-container"
      sx={{ minHeight: "100vh", width: "100%", padding: "2rem" }}
    >
      <Typography
        variant="h1"
        sx={{
          fontSize: { xs: "2rem", sm: "2.5rem", md: "3.2rem" },
        }}
      >
        Shopping cart
      </Typography>

      <Typography
        sx={{
          fontSize: "1.25rem",
          fontFamily: "PromptLight",
          fontStyle: "italic",
          marginTop: "2.5rem",
        }}
      >
        {`${quantity} Products in Cart`}
      </Typography>

      {orders.length > 0 && quantity > 0 ? (
        <ProductCart
          orders={orders}
          quantity={quantity}
          totalPrice={totalPrice}
        />
      ) : (
        <EmptyCart />
      )}

      <Box sx={{ marginTop: "5rem" }}>
        <RecommendProduct products={products} />
      </Box>
    </Box>
  );
};

export default Content;
