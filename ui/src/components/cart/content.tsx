// Material design
import { Container, Typography } from "@mui/material";

// Services & Global state
import { useAppSelector } from "@/features/hooks/use-global-state";

// Components
import EmptyCart from "@/components/cart/empty-cart";
import ProductCart from "@/components/cart/product-cart";

interface IProps {}

/***********************************************
 *                MAIN METHOD                  *
 **********************************************/
const Content = ({}: IProps) => {
  const { orders, amount, totalPrice } = useAppSelector(
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
        {`${amount} Products in Cart`}
      </Typography>

      {orders.length > 0 && amount > 0 ? (
        <ProductCart orders={orders} amount={amount} totalPrice={totalPrice} />
      ) : (
        <EmptyCart />
      )}
    </Container>
  );
};

export default Content;
