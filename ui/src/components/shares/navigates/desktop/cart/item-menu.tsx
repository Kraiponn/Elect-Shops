import React from "react";
import Image from "next/image";

// Material design
import { Box, Divider, Typography } from "@mui/material";
import DefaultProductImage from "@/assets/images/doctor.svg";

interface IProps {
  product_name: string;
  description: string;
  unit_price: number;
  image_url: string;
}

/***********************************************
 *                MAIN METHOD                  *
 **********************************************/
const ItemMenu = ({
  product_name,
  description,
  unit_price,
  image_url,
}: IProps) => {
  return (
    <>
      <Box
        component="div"
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: "8rem",
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

        <Box sx={{ ml: 1 }}>
          <Typography
            sx={{
              fontSize: "0.89rem",
              fontFamily: "PromptMedium",
              fontWeight: 500,
            }}
          >
            {product_name}
          </Typography>

          <Typography
            sx={{
              fontSize: "0.75rem",
              fontFamily: "PromptThin",
              fontWeight: 700,
            }}
          >
            {description}
          </Typography>

          <Typography
            sx={{
              fontSize: "0.75rem",
              fontFamily: "PromptBold",
              fontWeight: 200,
            }}
          >{`฿${unit_price}`}</Typography>
        </Box>
      </Box>

      <Divider sx={{ my: 1 }} />
    </>
  );
};

export default ItemMenu;
