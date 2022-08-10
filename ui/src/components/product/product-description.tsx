import React from "react";

// Material design
import {
  Box,
  Typography,
  Grid,
  Rating,
  IconButton,
  Button,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircleOutline";

import { ThaiCurrencyFormatWithBuildIn } from "@/features/services";
import { IProduct } from "@/features/interfaces";

// Type for method
interface IProps {
  product: IProduct;
  productQuantity: number;
  increaseProduct: () => void;
  decreaseProduct: () => void;
  handleAddProductToCart: (product: IProduct) => void;
}

/***********************************************************************************
 *                          ---  MAIN FUNCTION   ---                               *
 **********************************************************************************/
const ProductDescription = ({
  product,
  productQuantity,
  increaseProduct,
  decreaseProduct,
  handleAddProductToCart,
}: IProps) => {
  return (
    <Grid item xs={12} md={7} sx={{ paddingLeft: "2rem" }}>
      <Typography variant="h3">{product.product_name}</Typography>

      <Typography
        variant="body1"
        sx={{
          textIndent: "1.5rem",
          mt: "1rem",
          "&::first-letter": {
            textIndent: "2rem",
          },
        }}
      >
        {product.description}
      </Typography>

      {/************* Promotions ************/}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          marginTop: "2.5rem",
          padding: "1rem",
          background: "rgba(240, 236, 236, 0.407)",
        }}
      >
        <Typography
          variant="h2"
          sx={{
            color: "#fa0505",
          }}
        >
          {ThaiCurrencyFormatWithBuildIn(product.unit_price)}
        </Typography>
      </Box>

      {/************* Ratings and Favorite ************/}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          marginTop: "1rem",
        }}
      >
        <Rating name="favorite" defaultValue={4.5} precision={0.5} />
        <Box sx={{ marginX: "1rem" }}>{"|"}</Box>

        <Typography variant="body2">{`9k Ratings`}</Typography>

        <Box sx={{ marginX: "1rem" }}>{"|"}</Box>
        <Typography variant="body2">{`5k Sold`}</Typography>
      </Box>

      {/************* Increase and Decrease product qantity ************/}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          marginTop: "1.5rem",
        }}
      >
        <Typography
          sx={{
            fontFamily: "Prompt",
            fontWeight: 400,
          }}
        >
          {`Quantity`}
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            marginLeft: "0.5rem",
          }}
          component="div"
        >
          <IconButton color="inherit" onClick={() => decreaseProduct()}>
            <RemoveCircleIcon fontSize="large" />
          </IconButton>

          <Typography
            variant="h4"
            sx={{
              marginX: "1rem",
            }}
          >
            {productQuantity}
          </Typography>

          <IconButton color="inherit" onClick={() => increaseProduct()}>
            <AddCircleIcon fontSize="large" />
          </IconButton>
        </Box>

        <Typography
          sx={{
            fontFamily: "Prompt",
            fontWeight: 400,
            marginLeft: "1.2rem",
          }}
        >
          {`(${product.in_stock}) pieces`}
        </Typography>
      </Box>

      {/************** Add to cart and Buy now button *****************/}
      <Box sx={{ marginTop: "3.5rem" }}>
        <Button
          sx={{
            padding: "0.75rem 2rem",
            fontSize: "1.2rem",
            borderRadius: ".25rem",
            border: "0.2rem solid #f50057",
            background: "#f500561d",
            color: "#f50057",
            transition: "all .35s ease",
            "&:hover": {
              background: "#f50057",
              cursor: "pointer",
              color: "#dadce5",
              transform: "scale(0.99)",
            },
            "&:active": {
              transform: "scale(0.9)",
            },
          }}
          onClick={() => handleAddProductToCart(product)}
        >{`Add to Cart`}</Button>

        <Button
          sx={{
            marginLeft: "1rem",
            padding: "0.75rem 2rem",
            fontSize: "1.2rem",
            borderRadius: ".25rem",
            border: "0.2rem solid #f50057",
            background: "#f50057",
            color: "#f0f1f6",
            transition: "all .35s ease",
            "&:hover": {
              background: "rgb(186, 7, 70)",
              cursor: "pointer",
              color: "#cbcdd7",
              transform: "scale(0.99)",
            },
            "&:active": {
              transform: "scale(0.9)",
            },
          }}
        >{`Buy Now`}</Button>
      </Box>
    </Grid>
  );
};

export default ProductDescription;
