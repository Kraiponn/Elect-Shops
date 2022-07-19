// Material design
import { Box, Container, Typography } from "@mui/material";

// Services & Global state
import { useAppSelector } from "@/features/hooks/use-global-state";

// Components
import EmptyCart from "@/components/cart/empty-cart";
import ProductCart from "@/components/cart/product-cart";
import ProductSlider from "@/components/shares/ui/product-list-slider";
import { IProduct } from "@/features/types";
import RecommendProduct from "./recommend-products";

interface IProps {
  products: IProduct[];
}

/***********************************************
 *                MAIN METHOD                  *
 **********************************************/
const Content = ({ products }: IProps) => {
  const { orders, quantity, totalPrice } = useAppSelector(
    (state) => state.product
  );

  return (
    <Container
      className="cart-container"
      sx={{ minHeight: "100vh", width: "100%", paddingY: "2rem" }}
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
    </Container>
  );
};

export default Content;
