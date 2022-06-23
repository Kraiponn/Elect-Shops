import React from "react";
import Image from "next/image";

// Materials
import { Box, Typography } from "@mui/material";
import CottageIcon from "@mui/icons-material/Cottage";

// Color system
import { clWhite } from "@/features/const/colors";

import Logo from "@/assets/images/little-pug-dog.webp";

type Props = {};

const LeftSide = (props: Props) => {
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100%",
        bgcolor: "#263238",
        color: clWhite,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image src={Logo} width={100} height={100} alt="Logo" />
      <Box sx={{}}>
        <Typography variant="h1">Welcome to CMK Shopping</Typography>
        <Typography variant="h2">Welcome to CMK Shopping</Typography>
        <Typography variant="h3">Welcome to CMK Shopping</Typography>
        <Typography variant="h4">Welcome to CMK Shopping</Typography>
        <Typography variant="h5">Welcome to CMK Shopping</Typography>
        <Typography variant="h6">Welcome to CMK Shopping</Typography>
      </Box>
    </Box>
  );
};

export default LeftSide;
