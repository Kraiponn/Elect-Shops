import React from "react";
import { useRouter } from "next/router";

// Material design
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { Box, Button, SvgIconTypeMap, Typography } from "@mui/material";
import { clPrimaryDark } from "@/features/const/colors";

interface IProps {
  amount: number;
  totalPrice: number;
  Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
  };
}

/***********************************************
 *                MAIN METHOD                  *
 **********************************************/
const TotalOrder = ({ amount, totalPrice, Icon }: IProps) => {
  const router = useRouter();

  return amount <= 0 ? (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: "1rem",
        paddingY: "1rem",
      }}
    >
      <Icon color="inherit" fontSize="large" />

      <Typography
        sx={{
          fontFamily: "PromptThin",
          fontWeight: "200",
        }}
      >
        {`Your cart is empty`}
      </Typography>
      <Typography
        sx={{
          fontSize: "1.2rem",
          color: clPrimaryDark,
        }}
      >
        {`Keep Shopping`}
      </Typography>
    </Box>
  ) : (
    <Box
      sx={{
        "&:hover": {
          color: "red",
          cursor: "pointer",
        },
      }}
    >
      <Typography
        sx={{
          fontFamily: "PromptBold",
          fontSize: "1.3rem",
          marginLeft: "0.15rem",
        }}
      >
        {`Total: ฿${totalPrice}`}
      </Typography>

      <Button
        variant="contained"
        fullWidth
        sx={{ py: 1, fontSize: "1rem" }}
        onClick={() => router.push("/products/cart")}
      >
        {`Go to Cart`}
      </Button>
    </Box>
  );
};

export default TotalOrder;
