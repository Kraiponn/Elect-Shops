import useTranslation from "next-translate/useTranslation";

// Material design
import { Box, Typography } from "@mui/material";

// Global types & Global state
import { useAppSelector } from "@/features/hooks/use-global-state";
import { IProduct } from "@/features/interfaces";

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
  const { t } = useTranslation("cart");
  const { orders, quantity, totalPrice } = useAppSelector(
    (state) => state.product
  );

  return (
    <Box
      className="cart-container"
      sx={{ minHeight: "100vh", width: "100%", padding: "2rem" }}
    >
      <Typography
        component="h2"
        sx={{
          fontFamily: "Prompt",
          fontSize: { xs: "1.55rem", sm: "1.789rem", md: "2.5rem" },
          fontWeight: 900,
        }}
      >
        {t("title")}
      </Typography>

      <Typography
        variant="subtitle1"
        sx={{
          fontStyle: "italic",
          mt: "2rem",
          mb: "0.75rem",
        }}
      >
        {t("searchProductResult", { productTotal: quantity })}
      </Typography>

      {orders.length > 0 && quantity > 0 ? (
        <ProductCart
          orders={orders}
          quantity={quantity}
          totalPrice={totalPrice}
        />
      ) : (
        <EmptyCart
          title={t("emptyCart.title")}
          buttonLabel={t("emptyCart.buttonLabel")}
        />
      )}

      <Box sx={{ marginTop: "5rem" }}>
        <RecommendProduct products={products} />
      </Box>
    </Box>
  );
};

export default Content;
