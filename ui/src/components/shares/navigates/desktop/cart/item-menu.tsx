import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";

// Material design
import { Box, Grid, Typography } from "@mui/material";

// Global state, system colors and types
import { useAppSelector } from "@/features/hooks/use-global-state";

// Converter
import { ThaiCurrencyFormatWithBuildIn } from "@/features/services";
import { clSecondary } from "@/features/const/colors";

// Components
import DefaultProductImage from "@/assets/images/little-pug-dog.webp";

interface IProps {
  id: number;
  product_name: string;
  description: string;
  unit_price: number;
  image_url: string;
}

/***********************************************************************************
 *                          ---   MAIN FUNCTION   ---                              *
 **********************************************************************************/
const ItemMenu = ({ id, product_name, unit_price, image_url }: IProps) => {
  const router = useRouter();
  const { darkMode } = useAppSelector((state) => state.gui);

  const handleShowProductDetail = (productId: number) => {
    router.push(`/products/[productId]`, `/products/${productId}`, {
      locale: router.locale,
    });
  };

  return (
    <Box
      component="div"
      onClick={() => handleShowProductDetail(id)}
      sx={{
        borderBottom: darkMode
          ? "1px solid rgba(220, 217, 217, 0.1)"
          : "1px solid rgba(1, 1, 1, 0.1)",
        paddingY: "0.5rem",
        paddingX: "0.75rem",
        width: "100%",
        "&:hover": {
          cursor: "pointer",
        },
      }}
    >
      <Grid container>
        <Grid item xs={4}>
          <Box
            sx={{
              width: "100%",
              height: "5rem",
              position: "relative",
            }}
          >
            <Image
              src={image_url ? image_url : DefaultProductImage}
              alt="product-image"
              layout="fill"
              objectFit="contain"
            />
          </Box>
        </Grid>

        <Grid item xs={8}>
          <Box
            sx={{
              marginLeft: "10px",
              width: "100%",
              height: "5rem",
            }}
          >
            <Typography className="multine-ellipsis_2" variant="h6">
              {product_name}
            </Typography>

            <Typography
              variant="subtitle2"
              sx={{
                fontStyle: "italic",
                fontWeight: 700,
                color: clSecondary,
              }}
            >{`${ThaiCurrencyFormatWithBuildIn(unit_price)}`}</Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ItemMenu;
