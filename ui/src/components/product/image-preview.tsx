import React from "react";
import Image from "next/image";

// Material design
import { Box, Typography, Grid, IconButton } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

// Services & Global state
import { IProduct } from "@/features/interfaces";

// Components
import FacebookIcon from "@/assets/images/icons/icon-facebook.png";
import LineIcon from "@/assets/images/icons/icon-line.png";
import TwitterIcon from "@/assets/images/icons/icon-twitter.png";

// Type for method
interface IProps {
  product: IProduct;
}

/***********************************************************************************
 *                          ---  MAIN FUNCTION   ---                               *
 **********************************************************************************/
const ImagePreview = ({ product }: IProps) => {
  return (
    <Grid item xs={12} md={5}>
      {/*************   Product Image   *************/}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "30rem",
        }}
      >
        <Image
          src={product.image_url}
          alt={product.product_name}
          layout="fill"
          objectFit="contain"
        />
      </Box>

      <Box
        sx={{
          width: "100%",
          marginY: "2rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/*************   Social Network   *************/}
        <Box sx={{ display: "flex" }}>
          <Box
            sx={{
              position: "relative",
              width: 30,
              height: 30,
              borderRadius: "50%",
              "&:hover": {
                cursor: "pointer",
              },
            }}
          >
            <Image
              src={FacebookIcon}
              alt="facebook"
              layout="fill"
              objectFit="contain"
            />
          </Box>

          <Box
            sx={{
              position: "relative",
              width: 30,
              height: 30,
              borderRadius: "50%",
              marginX: "1rem",
              "&:hover": {
                cursor: "pointer",
              },
            }}
          >
            <Image
              src={LineIcon}
              alt="line"
              layout="fill"
              objectFit="contain"
            />
          </Box>

          <Box
            sx={{
              position: "relative",
              width: 30,
              height: 30,
              borderRadius: "50%",
              "&:hover": {
                cursor: "pointer",
              },
            }}
          >
            <Image
              src={TwitterIcon}
              alt="twitter"
              layout="fill"
              objectFit="contain"
            />
          </Box>
        </Box>

        <Box sx={{ fontSize: "1.5rem", marginX: "2rem" }}> | </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <IconButton>
            <FavoriteBorderIcon color="secondary" fontSize="large" />
          </IconButton>

          <Typography variant="subtitle1">Favorite (9.9k)</Typography>
        </Box>
      </Box>
    </Grid>
  );
};

export default ImagePreview;
