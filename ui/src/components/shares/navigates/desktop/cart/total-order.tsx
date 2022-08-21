import React from "react";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";

// Material design
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { Box, Button, SvgIconTypeMap, Typography } from "@mui/material";

// Global state and system colors
import { useAppSelector } from "@/features/hooks/use-global-state";
import { clDarkMedium, clWhite } from "@/features/const/colors";

// Converter
import { ThaiCurrencyFormatWithBuildIn } from "@/features/services";

interface IProps {
  quantity: number;
  totalPrice: number;
  Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
  };
}

/***********************************************************************************
 *                          ---   MAIN FUNCTION   ---                              *
 **********************************************************************************/
const TotalOrder = ({ quantity, totalPrice, Icon }: IProps) => {
  const router = useRouter();
  const { t } = useTranslation("common");
  const { darkMode } = useAppSelector((state) => state.gui);

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
      <Icon color="inherit" sx={{ fontSize: "3.5rem" }} />

      <Typography variant="h5">
        {t("topNavigation.cartMenu.emptyTitle")}
      </Typography>
      <Typography variant="subtitle1">
        {t("topNavigation.cartMenu.emptySubtitle")}
      </Typography>
    </Box>
  ) : (
    <Box
      className="total-price"
      sx={{
        padding: "1rem 1rem",
        width: "100%",
        height: "100%",
        background: darkMode ? clDarkMedium : clWhite,
        boxShadow: "0 .2rem .5rem blue",
        position: "sticky",
        left: 0,
        bottom: "0%",
        zIndex: 9999,
      }}
    >
      <Typography
        variant="h5"
        sx={{
          marginLeft: "0.15rem",
          marginBottom: "0.789rem",
        }}
      >
        {`${t("topNavigation.cartMenu.total")}: ${ThaiCurrencyFormatWithBuildIn(
          totalPrice
        )}`}
      </Typography>

      <Button
        variant="contained"
        fullWidth
        sx={{
          py: 1,
          fontSize: "1rem",
          fontWeight: 700,
          "&:hover": {
            cursor: "pointer",
          },
        }}
        onClick={() =>
          router.push("/products/cart", "/products/cart", {
            locale: router.locale,
          })
        }
      >
        {t("topNavigation.cartMenu.goToCartButton")}
      </Button>
    </Box>
  );
};

export default TotalOrder;
