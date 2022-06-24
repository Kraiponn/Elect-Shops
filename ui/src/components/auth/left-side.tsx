import React from "react";
import Image from "next/image";

// Materials
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";

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
      <Box sx={{
        // display: "flex",
        // justifyContent: "center",
        // alignItems: "center",
        textAlign: 'center'
      }}>
        <Image src={Logo} width={100} height={100} alt="Logo" />
        <Typography sx={{ mt: 2 }} variant="h3"
          component={motion.div}
          whileHover={{
            scale: 1.2,
            transition: { duration: 0.3 }
          }}
          whileTap={{ scale: 0.9 }}
          initial={{x: '100%'}}
          animate={{x: '0'}}
        >Welcome to CMK Shopping</Typography>
      </Box>
    </Box>
  );
};

export default LeftSide;
