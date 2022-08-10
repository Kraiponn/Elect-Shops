import Image from "next/image";

// Components
import { Box, Typography } from "@mui/material";

import ProductNotFoundLogo from "@/assets/images/empty-cart.png";

/***********************************************
 *               MAIN METHOD
 **********************************************/
export default function ProductNotFound() {
  return (
    <Box
      sx={{
        width: "70%",
        minHeight: "100vh",
        margin: "3rem auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        border: "0.001rem solid rgba(182, 180, 180, 0.356)",
      }}
    >
      <Typography
        variant="h1"
        sx={{
          color: "rgb(251, 5, 5)",
        }}
      >{`!Oops`}</Typography>
      <Typography
        variant="h4"
        sx={{
          color: "#919090d2",
          marginY: "1rem",
        }}
      >{`Product Not Found`}</Typography>

      <Box sx={{ position: "relative", width: "35%", height: "13rem" }}>
        <Image
          src={ProductNotFoundLogo}
          alt="not found"
          layout="fill"
          objectFit="contain"
        />
      </Box>
    </Box>
  );
}
