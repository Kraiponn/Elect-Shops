import React from "react";
import { useRouter } from "next/router";

// Material design
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { Box, Button, SvgIconTypeMap, Typography } from "@mui/material";
import { clPrimaryDark } from "@/features/const/colors";

// Converter
import { ThaiCurrencyFormatWithBuildIn } from "@/features/services";

interface IProps {
  quantity: number;
  totalPrice: number;
  Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
  };
}

/***********************************************
 *                MAIN METHOD                  *
 **********************************************/
const TotalOrder = ({ quantity, totalPrice, Icon }: IProps) => {
  const router = useRouter();

  return quantity <= 0 ? (
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
      className="total-price"
      sx={{
        padding: "1rem 1rem",
        width: "100%",
        height: "100%",
        background: "rgb(255, 255, 255)",
        boxShadow: "0 .2rem .5rem blue",
        position: "sticky",
        left: 0,
        bottom: "0%",
        zIndex: "9999",
      }}
    >
      <Typography
        sx={{
          fontFamily: "PromptBold",
          fontSize: "1.3rem",
          marginLeft: "0.15rem",
        }}
      >
        {`Total: ${ThaiCurrencyFormatWithBuildIn(totalPrice)}`}
      </Typography>

      <Button
        variant="contained"
        fullWidth
        sx={{
          py: 1,
          fontSize: "1rem",
          fontWeight: 700,
          "&:hover": {
            color: "red",
            cursor: "pointer",
          },
        }}
        onClick={() => router.push("/products/cart")}
      >
        {`Go to Cart`}
      </Button>
    </Box>
  );
};

export default TotalOrder;
