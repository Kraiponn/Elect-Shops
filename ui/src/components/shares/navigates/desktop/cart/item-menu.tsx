import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";

// Material design
import { Box, Grid, Typography } from "@mui/material";

// Converter
import { ThaiCurrencyFormatWithBuildIn } from "@/features/services";

// Components
import DefaultProductImage from "@/assets/images/little-pug-dog.webp";

interface IProps {
  id: number;
  product_name: string;
  description: string;
  unit_price: number;
  image_url: string;
}

/***********************************************
 *                MAIN METHOD                  *
 **********************************************/
const ItemMenu = ({
  id,
  product_name,
  description,
  unit_price,
  image_url,
}: IProps) => {
  const router = useRouter();

  const handleShowProductDetail = (productId: number) => {
    // router.push({
    //   pathname: `/products/${productId}`,
    //   query: { productId },
    // });
    router.push(`/products/${productId}`);
  };

  return (
    <Box
      component="div"
      onClick={() => handleShowProductDetail(id)}
      sx={{
        borderBottom: ".1rem solid black",
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
              objectFit="cover"
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
            <Typography
              className="multine-ellipsis_2"
              sx={{
                fontSize: "1.1rem",
                fontFamily: "PromptBold",
              }}
            >
              {product_name}
            </Typography>

            {/* <Typography
                className="multine-ellipsis_2"
                sx={{
                  fontSize: "0.75rem",
                  fontFamily: "PromptThin",
                  fontWeight: 700,
                }}
              >
                {description}
              </Typography> */}

            <Typography
              sx={{
                fontSize: "1rem",
                fontFamily: "PromptMedium",
                fontWeight: 200,
                fontStyle: "italic",
                color: "red",
              }}
            >{`${ThaiCurrencyFormatWithBuildIn(unit_price)}`}</Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ItemMenu;
