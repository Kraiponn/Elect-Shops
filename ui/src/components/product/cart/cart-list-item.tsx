// Material design
import { Box, Grid, Typography, IconButton } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";

// Global state, types and colors system
import { useAppSelector } from "@/features/hooks/use-global-state";
import { ThaiCurrencyFormatWithBuildIn } from "@/features/services";
import { IProduct, IOrderProduct } from "@/features/interfaces";
import {
  clDarkMedium,
  clPrimaryDark,
  clSecondary,
  clWhite,
} from "@/features/const/colors";

interface IProps {
  orders: IOrderProduct[];
  increaseProductToCart: (product: IProduct) => void;
  decreaseProductFromCart: (product: IProduct) => void;
  removeProductFromCart: (product: IProduct) => void;
}

/***********************************************************************************
 *                          ---  MAIN FUNCTION   ---                               *
 **********************************************************************************/
const CartListItem = ({
  orders,
  increaseProductToCart,
  decreaseProductFromCart,
  removeProductFromCart,
}: IProps) => {
  const { darkMode } = useAppSelector((state) => state.gui);

  return (
    <Grid item xs={12} md={8}>
      {orders.map((order, index) => (
        <Box
          key={index}
          sx={{
            width: "100%",
            height: "14rem",
            padding: "0.789rem 1rem",
            mb: "0.5rem",
            background: darkMode ? clDarkMedium : clWhite,
            boxShadow: darkMode
              ? "0 0 7px rgba(221, 219, 224, 0.302)"
              : "0 0 7px rgba(1, 1, 1, 0.162)",
            borderRadius: "5px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Product detail and increase or decrease */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "flex-start",
              paddingRight: "7rem",
              width: "80%",
              height: "100%",
            }}
          >
            {/************* Product Description *************/}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "flex-start",
                height: "100%",
              }}
            >
              <Box>
                <Typography
                  sx={{
                    fontFamily: "Prompt",
                    fontSize: "1.45rem",
                    fontWeight: "700",
                    mb: 1,
                  }}
                >{`${order.product.product_name}`}</Typography>

                <Typography
                  className="multine-ellipsis_2"
                  sx={{
                    fontFamily: "Prompt",
                    fontWeight: 400,
                    fontSize: "1rem",
                    paddingLeft: "1rem",
                  }}
                >{`${order.product.description}`}</Typography>

                <Box sx={{ marginTop: "0.5rem" }}>
                  <Typography
                    sx={{
                      fontFamily: "Prompt",
                      fontWeight: 400,
                      paddingLeft: "1rem",
                    }}
                    component="span"
                  >{`Unit price:`}</Typography>
                  <Typography
                    sx={{
                      fontFamily: "Prompt",
                      fontSize: "1rem",
                      fontWeight: 700,
                      paddingLeft: "1rem",
                      color: clSecondary,
                    }}
                    component="span"
                  >{`${ThaiCurrencyFormatWithBuildIn(
                    order.product.unit_price
                  )}`}</Typography>
                </Box>
              </Box>
            </Box>

            {/************ Increase or Decrease product from cart *************/}
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
              component="div"
            >
              <IconButton
                color="inherit"
                onClick={() => decreaseProductFromCart(order.product)}
              >
                <RemoveCircleIcon fontSize="large" />
              </IconButton>

              <Typography
                sx={{
                  fontSize: "1.3rem",
                  fontWeight: "500",
                  marginX: "1rem",
                  color: "inherit",
                }}
              >
                {order.quantity}
              </Typography>

              <IconButton
                color="inherit"
                onClick={() => increaseProductToCart(order.product)}
              >
                <AddCircleIcon fontSize="large" />
              </IconButton>
            </Box>
          </Box>

          {/* Remove from cart and show total price */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly",
              alignItems: "center",
              height: "100%",
              width: "20%",
            }}
          >
            <IconButton onClick={() => removeProductFromCart(order.product)}>
              <DeleteIcon fontSize="large" color="secondary" />
            </IconButton>

            <Typography
              sx={{
                fontSize: "1.2rem",
                fontWeight: "bold",
                color: clPrimaryDark,
              }}
            >{`${ThaiCurrencyFormatWithBuildIn(order.totalPrice)}`}</Typography>
          </Box>
        </Box>
      ))}
    </Grid>
  );
};

export default CartListItem;
