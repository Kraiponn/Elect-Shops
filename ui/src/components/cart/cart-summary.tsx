// Material design
import {
  Box,
  Grid,
  Typography,
  Button,
  TextField,
  IconButton,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

import { DELIVERY_CHARGE } from "@/features/const/currency";

// Components
import TextHorizontal from "@/components/cart/text-horizontal";

interface IProps {
  quantity: number;
  totalPrice: number;
  handleShopingMoreProduct: () => void;
}

/***********************************************************************************
 *                          ---  MAIN FUNCTION   ---                               *
 **********************************************************************************/
const CartSummary = ({
  quantity,
  totalPrice,
  handleShopingMoreProduct,
}: IProps) => {
  const gotoShopingMoreProduct = () => {
    handleShopingMoreProduct();
  };

  return (
    <Grid item xs={12} md={4} sx={{ width: "100%" }}>
      <Box
        sx={{
          width: "100%",
          padding: "0 2rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "flex-start",
        }}
      >
        <Typography
          sx={{
            fontFamily: "Prompt",
            fontWeight: 400,
            fontSize: "1.2rem",
            marginTop: "0rem",
          }}
        >
          {`Promotions`}
        </Typography>

        <Box sx={{ display: "flex", width: "100%", mb: 0 }}>
          <IconButton>
            <ClearIcon fontSize="medium" />
          </IconButton>
          <Typography
            sx={{
              fontSize: "1rem",
              fontFamily: "Prompt",
              fontWeight: 600,
              color: "rgb(108, 105, 105)",
              marginY: "1rem",
            }}
          >
            {`WESHOBSHOP`}
          </Typography>
          &nbsp;&nbsp;

          <Typography
            sx={{
              fontSize: "1rem",
              fontFamily: "Prompt",
              fontWeight: 400,
              color: "rgb(108, 105, 105)",
              marginY: "1rem",
            }}
          >
            {`is applied`}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", width: "100%", mt: 0 }}>
          <TextField size="small" fullWidth placeholder="Enter Coupon" />
          <Button variant="contained">{`APPLY`}</Button>
        </Box>

        {/************ quantity Order *************/}
        <TextHorizontal
          title={`${quantity} Items`}
          value={totalPrice}
          fontWeight={700}
          marginTop="1.5rem"
        />

        {/************ Order Delivery Charge *************/}
        <TextHorizontal
          title={`Delivery charge`}
          value={DELIVERY_CHARGE}
          fontWeight={700}
          marginTop="0.5rem"
        />

        <Box
          sx={{
            height: "0.1rem",
            background: "#b6b3b3",
            margin: "2rem auto",
            marginBottom: "1.7rem",
            width: "80%",
          }}
        />

        {/************ Total Order *************/}
        <TextHorizontal
          title={`Total`}
          value={DELIVERY_CHARGE + totalPrice}
          fontWeight={700}
          fontSize={`1.4rem`}
          marginTop="0rem"
        />

        {/* Check out and Add more product buttons */}
        <Button
          variant="contained"
          fullWidth
          sx={{
            marginTop: "0.7rem",
            padding: "1rem 0",
            fontSize: "1.1rem",
            width: "100%",
          }}
          // onClick={handleKeepShopping}
        >
          {`CHECK OUT`}
        </Button>

        <Button
          variant="outlined"
          color="secondary"
          fullWidth
          sx={{
            marginTop: "0.7rem",
            padding: "1rem 0",
            fontSize: "1.1rem",
            width: "100%",
          }}
          onClick={gotoShopingMoreProduct}
        >
          {`Add More Product`}
        </Button>
      </Box>
    </Grid>
  );
};

export default CartSummary;
