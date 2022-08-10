import React from "react";

// Types and Services
import { IProduct } from "@/features/interfaces";
import { clSecondary } from "@/features/const/colors";
import { ThaiCurrencyFormatWithBuildIn } from "@/features/services";

// Material Design
import { Box, Button, Typography, IconButton } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

interface IProps {
  product_name: string;
  description: string;
  unit_price: number;
  product: IProduct;
  favorite: boolean;
  handleToggleProductFavorite: () => void;
  handleIncreaseProductToCart: (product: IProduct) => void;
}

/***********************************************************************************
 *                         -----   MAIN FUNCTION   -----                           *
 **********************************************************************************/
export default function ProductItemHover({
  product,
  product_name,
  description,
  unit_price,
  favorite,
  handleIncreaseProductToCart,
  handleToggleProductFavorite,
}: IProps) {
  return (
    <Box
      className="card-container_hover"
      sx={{
        width: "45%",
        maxHeight: "20rem",
        padding: "1rem 2rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "flex-start",
        position: "absolute",
        left: "30%",
        bottom: "100%",
        zIndex: 12000,
        background: "rgb(255, 255, 255)",
        boxShadow: "0 0rem .3rem rgb(67, 92, 255)",
        borderRadius: ".5rem",
        visibility: "hidden",
        transform: "scale(0)",
        opacity: 0,
        transition: "all 0.2s ease",
        "&::after": {
          content: '""',
          position: "absolute",
          top: "100%",
          left: "50%",
          transform: "translateX(-50%)",
          width: 0,
          height: 0,
          // borderLeft: "10px solid transparent",
          // borderRight: "10px solid transparent",
          // borderTop: "20px solid rgb(255, 255, 255)",
          borderStyle: "solid",
          borderWidth: "20px 10px 0 10px",
          borderColor: "white transparent transparent transparent",
          filter: "drop-shadow(1px 1px 1px rgba(67, 92, 255, 0.795))",
        },
      }}
      component="div"
    >
      <Typography variant="h5">{product_name}</Typography>
      <Typography
        className="multine-ellipsis_4"
        variant="body2"
        sx={{
          textIndent: "1rem",
          mt: 1,
        }}
      >
        {description}
      </Typography>

      <Typography
        variant="h5"
        sx={{ color: clSecondary, marginY: "1rem" }}
      >{`Price: ${ThaiCurrencyFormatWithBuildIn(unit_price)}`}</Typography>

      <Box
        sx={{
          display: "flex",
          width: "100%",
        }}
      >
        <Button
          sx={{
            color: "rgb(255, 255, 255)",
            background: "rgb(64, 179, 7)",
            padding: "0.35rem 3rem",
            fontFamily: "Prompt",
            fontSize: "1.2rem",
            fontWeight: "900",
            flexGrow: 1,
            transition: "all 0.5s ease",
            "&:hover": {
              background: "rgb(67, 151, 24)",
            },
            "&:active": {
              transform: "scale(0.9)",
            },
          }}
          onClick={() => handleIncreaseProductToCart(product)}
        >
          Add to Cart
        </Button>

        <IconButton onClick={handleToggleProductFavorite}>
          {favorite ? (
            <FavoriteIcon
              color="secondary"
              fontSize="large"
              sx={{ fontSize: "3rem" }}
            />
          ) : (
            <FavoriteBorderIcon
              color="secondary"
              fontSize="large"
              sx={{ fontSize: "3rem" }}
            />
          )}
        </IconButton>
      </Box>
    </Box>
  );
}
