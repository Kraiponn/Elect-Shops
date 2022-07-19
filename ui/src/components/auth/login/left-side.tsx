import React from "react";
import Image from "next/image";

// Materials
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";

// Color system
import { clWhite, clYellowMain } from "@/features/const/colors";

import Logo from "@/assets/images/little-pug-dog.webp";

/****************************************************
 *  MAIN FUNCTION
 */
const LeftSide = () => {
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
      <Box
        sx={{
          textAlign: "center",
          p: 2,
        }}
      >
        <Box
          component={motion.div}
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            scale: [0.5, 1.2, 0.5, 1.2, 1],
            transition: {
              duration: 1,
            },
          }}
        >
          <Image src={Logo} width={100} height={100} alt="Logo" />
        </Box>

        <Typography
          sx={{
            mt: 2,
            ":hover": {
              cursor: "pointer",
            },
            color: clYellowMain,
          }}
          variant="h4"
          component={motion.div}
          whileHover={{
            scale: 1.1,
            transition: {
              duration: 0.3,
              yoyo: Infinity,
              // repeat: Infinity,
            },
          }}
          // whileTap={{ scale: 0.9 }}
          initial={{ x: 0, opacity: 0 }}
          animate={{ x: [50, -50, 0], opacity: 1 }}
          exit={{ x: 0 }}
          transition={{
            dealy: 1,
            ease: "linear",
            duration: 2,
            // yoyo: 3,
          }}
        >
          {`Shopping Online`}
        </Typography>

        <Typography
          sx={{
            mt: 2,
            ":hover": {
              cursor: "pointer",
            },
          }}
          variant="h5"
          component={motion.div}
          initial={{ x: 0, opacity: 0 }}
          animate={{ x: [-50, 50, 0], opacity: 1 }}
          exit={{ x: 0 }}
          transition={{
            dealy: 1,
            ease: "linear",
            duration: 2,
          }}
        >
          {`Welcome to shob shop. Please signin to join with us.`}
        </Typography>
      </Box>
    </Box>
  );
};

export default LeftSide;
