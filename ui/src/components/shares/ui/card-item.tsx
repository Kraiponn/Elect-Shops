import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";

// Material design
import { Typography, Box, Rating, Button } from "@mui/material";

// Types
import { IProduct } from "@/features/types";

// Global state
import { useAppDispatch } from "@/features/hooks/use-global-state";
import { increaseProductToCart } from "@/features/global-state/reducers/product";

interface ICardItem {
  product: IProduct;
}

/***********************************************
 *                MAIN METHOD                  *
 **********************************************/
const CardItem = ({ product }: ICardItem) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const goToProductDetail = (productId: number) => {
    router.push({
      pathname: "/products/[productId]",
      query: { productId },
    });
  };

  const handleAddToCart = (product: IProduct) => {
    dispatch(increaseProductToCart(product));
  };

  return (
    <Box
      className="card-item_container"
      sx={{
        padding: "1.5rem 2rem",
        position: "relative",
        "&:hover": {
          // border: "0.1rem inset rgb(255, 5, 5)",
          ".card-item_detail": {
            height: "100%",
            opacity: 1,
            bottom: 0,
          },
          ".add-to-card": {
            opacity: 1,
            visibility: "visible",
          },
          // ".card-hover": {
          //   opacity: 1,
          //   top: 0,
          // },
        },
      }}
    >
      {/***********  Add to card button when hover *************/}
      <Box
        className="add-to-card"
        sx={{
          width: "100%",
          height: "3rem",
          background: "#01c501",
          color: "white",
          borderRadius: "0.5rem",
          position: "absolute",
          left: 0,
          bottom: "0%",
          zIndex: 1,

          visibility: "hidden",
          opacity: 0,
          transition: "all .3s ease",
          "&:hover": {
            cursor: "pointer",
            background: "rgb(22, 150, 22)",
            transform: "scale(0.98)",
          },
          "&:active": {
            transform: "scale(0.9)",
          },
        }}
      >
        <Typography
          onClick={() => handleAddToCart(product)}
          sx={{
            fontSize: "1rem",
            fontWeight: 700,
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {`ADD TO CARD`}
        </Typography>
      </Box>

      {/***********  Hover box *************/}
      <Box
        className="card-hover"
        sx={{
          position: "absolute",
          left: 0,
          top: "-100%",
          zIndex: 1,
          width: "95%",
          height: "97%",
          boxShadow: "0 .1rem .5rem black",
          borderRadius: ".5rem",
          background: "rgba(255, 255, 255, 0.993)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "column",
          textAlign: "center",
          // marginBottom: "5rem",
          marginTop: ".5rem",
          paddingX: ".55rem",
          paddingY: "1rem",
          boxSizing: "border-box",
          opacity: 0,
          transition: "all .3s ease",
        }}
      >
        <div>
          <Typography
            sx={{
              fontSize: "1.2rem",
              fontWeight: 900,
              mt: 2,
            }}
          >
            {product.product_name}
          </Typography>

          <Typography
            sx={{
              fontSize: "1.2rem",
              fontWeight: 700,
              color: "red",
              mt: 3,
            }}
          >{`PRICE $${product.unit_price}`}</Typography>
        </div>

        <Button
          variant="contained"
          sx={{ width: "70%", marginTop: "0" }}
        >{`Add to Cart`}</Button>
      </Box>

      {/***********  Image of Card *************/}
      <Box
        sx={{
          width: "100%",
          height: "10rem",
          position: "relative",
          marginBottom: "0rem",
          transition: "all 1s ease",
          "&:hover": {
            transform: "scale(1.1)",
            cursor: "pointer",
          },
        }}
      >
        <Image
          onClick={() => goToProductDetail(Number(product.id))}
          src={product.image_url}
          alt={product.product_name}
          layout="fill"
          objectFit="contain"
        />
      </Box>

      {/***********  Text of card *************/}
      <p
        style={{
          fontSize: "1.3rem",
          fontFamily: "PromptBold",
          marginTop: "1rem",
          marginBottom: 0,
        }}
      >
        {product.product_name}
      </p>
      <p
        className="multine-ellipsis"
        style={{
          fontSize: "0.75rem",
          fontWeight: 200,
          fontFamily: "PromptLight",
          marginTop: 0,
          marginBottom: "0.5rem",
        }}
      >
        {product.description}
      </p>

      <Rating name="product" defaultValue={4.5} precision={0.5} />

      <Typography sx={{ fontSize: "1.1rem", fontFamily: "PromptBold" }}>
        ${product.unit_price}
      </Typography>
    </Box>
  );
};

export default CardItem;
